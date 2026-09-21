"""
================================================================================
MONTEZUMA CYPRESS (TAXODIUM MUCRONATUM / AHUEHUETE) PROCEDURAL GENERATOR
Blender 5.2 Procedural Botanical Engine
================================================================================
Botanical Features:
  - Multi-harmonic fluted/muscular composite trunk bole with deep organic clefts
  - Low bifurcation (2-4 massive twisting leaders at 2.5m - 4.5m)
  - Sprawling basal root toes and buttressed ground flare
  - Leonardo da Vinci pipe model recursive branching (L1 Scaffold -> L2 Shelves -> L3 Weeping Twigs)
  - Bishop Frame (Parallel Transport) non-twisting curve extrusions
  - Gravitropic weeping needle spray cards (L4) with custom spherical normal vector editing
  - Hanging Spanish moss (Tillandsia usneoides) catenary festoons
  - Complete Blender 5.2 Principled BSDF procedural shader node networks
================================================================================
"""

import bpy
import bmesh
import math
import random
import mathutils
from mathutils import Vector, Matrix, Quaternion, Euler, noise

# ==============================================================================
# 1. BOTANICAL CONFIGURATION & PARAMETRIC PRESETS
# ==============================================================================

class AhuehueteConfig:
    def __init__(self, seed=42):
        self.seed = seed
        random.seed(seed)
        
        # Overall Scale & Age
        self.overall_scale = 1.0          # Global scale multiplier
        self.trunk_height = 4.2           # Height to main bifurcation point (m)
        self.total_tree_height = 24.0     # Nominal full height (m)
        self.canopy_radius = 14.0         # Nominal crown radius (m)
        
        # Trunk Bole & Muscular Fluting
        self.base_radius = 2.8            # Radius at soil line (m)
        self.bifurcation_radius = 1.6     # Radius at bifurcation zone (m)
        self.num_trunk_rings = 48         # Vertical cross-section resolution
        self.num_radial_segments = 96     # Radial angular resolution
        self.num_muscle_cables = 7        # Number of prominent vertical muscle columns
        self.cable_depth = 0.38           # Depth of organic vertical furrows
        self.cable_twist = 0.45           # Sinuous spiral twist (radians over trunk height)
        self.root_flare_height = 2.2      # Height of sprawling root buttress (m)
        self.num_root_toes = 8            # Prominent sprawling root toes
        self.root_toe_spread = 2.4        # Horizontal outward flare distance (m)
        self.hollow_cavity = True         # Include ancient hollow cleft in trunk base
        self.cavity_depth = 0.65          # Inward dent factor for hollow
        
        # Bifurcation & Primary Leaders (L1)
        self.num_leaders = 3              # Main massive ascending trunks (2 to 4)
        self.leader_length = 12.0         # Length of L1 leaders (m)
        self.leader_steps = 22            # Curve steps per leader
        self.leader_rad_start = 0.95      # Base radius of L1 leader (m)
        self.leader_rad_end = 0.32        # Tip radius of L1 leader (m)
        self.num_scaffold_limbs = 7       # Extra horizontal scaffold limbs
        self.scaffold_spread_angle = 0.85 # Angle from vertical (radians)
        self.da_vinci_exponent = 2.25     # Pipe model area conservation exponent
        
        # Secondary Shelves (L2)
        self.l2_per_leader = 6            # Secondary branches per L1 limb
        self.l2_length_min = 4.5          # Minimum L2 branch length (m)
        self.l2_length_max = 8.5          # Maximum L2 branch length (m)
        self.l2_steps = 14                # Curve steps per L2 branch
        self.l2_horizontal_bias = 0.75    # Tendency to form flat horizontal shelves
        
        # Tertiary Weeping Twigs (L3)
        self.l3_density = 5               # L3 twigs per L2 branch
        self.l3_length = 2.2              # Twig length (m)
        self.l3_steps = 10                # Steps per twig
        self.l3_gravitropism = 0.82       # Gravitational downward pull factor (0=straight, 1=sheer weep)
        
        # Terminal Weeping Foliage Sprays (L4)
        self.generate_foliage = True
        self.foliage_fronds_per_twig = 6  # Needle cards per L3 branch
        self.frond_length = 1.1           # Length of needle card (m)
        self.frond_width = 0.32           # Width of needle card (m)
        self.frond_droop = 0.65           # Curvature of needle card
        self.frond_segments = 5           # Subdivision along frond length
        
        # Spanish Moss (Tillandsia usneoides)
        self.generate_moss = True
        self.moss_clusters = 65           # Number of moss draping attachment points
        self.moss_strands_per_cluster = 7 # Strands per beard cluster
        self.moss_length_min = 1.2        # Min hang length (m)
        self.moss_length_max = 3.6        # Max hang length (m)
        self.moss_curl_frequency = 4.5    # Sinuous curl frequency
        self.moss_curl_amplitude = 0.12   # Sinuous curl amplitude (m)


# ==============================================================================
# 2. MATHEMATICAL & GEOMETRIC UTILITIES
# ==============================================================================

def smoothstep(edge0, edge1, x):
    """Hermite smoothstep interpolation between edge0 and edge1."""
    t = max(0.0, min(1.0, (x - edge0) / (edge1 - edge0)))
    return t * t * (3.0 - 2.0 * t)

def catenary_curve_point(p0, p1, sag, t):
    """
    Computes a point on a hanging catenary curve between p0 and p1 at parameter t in [0, 1].
    Approximated via parabolic/hyperbolic blend with sag factor.
    """
    linear = p0.lerp(p1, t)
    # Parabolic catenary sag: 4 * sag * t * (1 - t)
    hang = 4.0 * sag * t * (1.0 - t)
    return Vector((linear.x, linear.y, linear.z - hang))

def compute_bishop_frames(points):
    """
    Computes parallel transport (Bishop) orthonormal frames along a discrete 3D space curve.
    Prevents artificial gimbal lock and unwanted twist along tortuous organic branches.
    Returns: list of (Tangent, Normal, Binormal) tuples for each point.
    """
    n = len(points)
    if n < 2:
        return [(Vector((0, 0, 1)), Vector((1, 0, 0)), Vector((0, 1, 0)))]
    
    tangents = []
    for i in range(n):
        if i == 0:
            t = (points[1] - points[0]).normalized()
        elif i == n - 1:
            t = (points[-1] - points[-2]).normalized()
        else:
            t = (points[i+1] - points[i-1]).normalized()
        if t.length < 1e-6:
            t = Vector((0, 0, 1))
        tangents.append(t)
    
    # Initialize first normal perpendicular to first tangent
    t0 = tangents[0]
    ref = Vector((0, 0, 1)) if abs(t0.z) < 0.9 else Vector((1, 0, 0))
    n0 = t0.cross(ref).normalized()
    b0 = t0.cross(n0).normalized()
    
    frames = [(t0, n0, b0)]
    curr_n = n0
    
    for i in range(1, n):
        t_prev = tangents[i-1]
        t_curr = tangents[i]
        axis = t_prev.cross(t_curr)
        if axis.length > 1e-6:
            axis.normalize()
            angle = math.acos(max(-1.0, min(1.0, t_prev.dot(t_curr))))
            rot = Quaternion(axis, angle)
            curr_n = (rot @ curr_n).normalized()
        # Gram-Schmidt re-orthogonalization
        curr_n = (curr_n - t_curr * curr_n.dot(t_curr)).normalized()
        curr_b = t_curr.cross(curr_n).normalized()
        frames.append((t_curr, curr_n, curr_b))
        
    return frames

def curl_noise_3d(v, scale=0.35, octaves=2):
    """Divergence-free organic curl noise for tortuous branch paths."""
    eps = 0.01
    vx, vy, vz = v.x * scale, v.y * scale, v.z * scale
    
    # Numerical derivatives of potential field
    def pot(p):
        return Vector((
            noise.noise(p + Vector((12.3, 45.6, 78.9))),
            noise.noise(p + Vector((98.7, 65.4, 32.1))),
            noise.noise(p + Vector((54.1, 87.2, 19.3)))
        ))
    
    p = Vector((vx, vy, vz))
    dp_dx = (pot(p + Vector((eps, 0, 0))) - pot(p - Vector((eps, 0, 0)))) / (2 * eps)
    dp_dy = (pot(p + Vector((0, eps, 0))) - pot(p - Vector((0, eps, 0)))) / (2 * eps)
    dp_dz = (pot(p + Vector((0, 0, eps))) - pot(p - Vector((0, 0, eps)))) / (2 * eps)
    
    curl = Vector((
        dp_dy.z - dp_dz.y,
        dp_dz.x - dp_dx.z,
        dp_dx.y - dp_dy.x
    ))
    return curl


# ==============================================================================
# 3. PROCEDURAL TRUNK & BUTTRESS GENERATOR (BMESH)
# ==============================================================================

def generate_montezuma_trunk(bm, cfg):
    """
    Synthesizes the iconic muscular, multi-columnar, fluted trunk bole of Taxodium mucronatum.
    Implements multi-harmonic radial distortion, root buttresses, hollow crevices, and smooth topology.
    """
    rings = cfg.num_trunk_rings
    segs = cfg.num_radial_segments
    h_max = cfg.trunk_height
    
    ring_verts = []
    
    # Precompute angular phases for individual muscle columns and root toes
    cable_phases = [(i * 2.0 * math.pi / cfg.num_muscle_cables) + random.uniform(-0.15, 0.15) 
                    for i in range(cfg.num_muscle_cables)]
    cable_strengths = [random.uniform(0.75, 1.25) for _ in range(cfg.num_muscle_cables)]
    
    root_phases = [(i * 2.0 * math.pi / cfg.num_root_toes) + random.uniform(-0.1, 0.1) 
                   for i in range(cfg.num_root_toes)]
    root_weights = [random.uniform(0.8, 1.3) for _ in range(cfg.num_root_toes)]
    
    # Hollow cavity orientation
    cavity_angle = random.uniform(0, 2.0 * math.pi)
    
    for r in range(rings):
        t_h = r / float(rings - 1)
        z = t_h * h_max
        
        # Vertical taper profile (hyperbolic flare at ground line, gentle waist, widening at bifurcation)
        # Base flare: strong expansion when z < cfg.root_flare_height
        flare_factor = math.exp(-z / 0.95) * (cfg.base_radius - cfg.bifurcation_radius)
        # Waist taper
        waist = math.sin(t_h * math.pi * 0.9) * 0.25
        # Bifurcation swell near top
        swell = smoothstep(0.65, 1.0, t_h) * 0.45
        
        r_mean = cfg.bifurcation_radius + flare_factor - waist + swell
        
        # Sinuous trunk axis wobble (natural leaning/swaying of massive trunk)
        axis_x = math.sin(t_h * 2.2) * 0.35 + math.sin(t_h * 5.1) * 0.12
        axis_y = math.cos(t_h * 1.8) * 0.28 + math.sin(t_h * 4.4) * 0.10
        
        verts_in_ring = []
        twist_angle = t_h * cfg.cable_twist
        
        for s in range(segs):
            theta = (s / float(segs)) * 2.0 * math.pi
            theta_twisted = theta + twist_angle
            
            # --- 1. Multi-Harmonic Muscle Columns (Vertical Ribs) ---
            rib_displacement = 0.0
            for cp, cw in zip(cable_phases, cable_strengths):
                # Harmonic cosine lobes with organic sharpening
                d_theta = math.cos(theta_twisted - cp)
                lobe = math.pow(max(0.0, (d_theta + 1.0) * 0.5), 3.0) # Sharpened peak
                rib_displacement += lobe * cfg.cable_depth * cw
                
            # Secondary vertical striations
            micro_ribs = math.cos(theta_twisted * cfg.num_muscle_cables * 2.0) * (cfg.cable_depth * 0.22)
            
            # --- 2. Sprawling Basal Root Toes (Ground Level Flare) ---
            root_flare_disp = 0.0
            root_envelope = math.exp(-z / (cfg.root_flare_height * 0.65))
            for rp, rw in zip(root_phases, root_weights):
                d_root = math.cos(theta - rp)
                # Steep bell curve for root toes
                toe = math.exp(-math.pow(1.0 - d_root, 1.8) * 6.5)
                root_flare_disp += toe * cfg.root_toe_spread * rw * root_envelope
                
            # --- 3. Ancient Hollow Cleft/Cavity ---
            cavity_disp = 0.0
            if cfg.hollow_cavity and z < cfg.trunk_height * 0.6:
                d_cav = math.cos(theta - cavity_angle)
                cav_envelope = (1.0 - smoothstep(0.0, cfg.trunk_height * 0.6, z))
                if d_cav > 0.3:
                    # Inward cleft indentation
                    cavity_disp = -math.pow((d_cav - 0.3) / 0.7, 1.5) * cfg.cavity_depth * cav_envelope
            
            # --- 4. Organic 3D Procedural Noise Perturbation ---
            noise_pos = Vector((math.cos(theta) * 1.5, math.sin(theta) * 1.5, z * 0.75))
            bark_pert = (noise.noise(noise_pos * 1.8) - 0.5) * 0.18
            
            # Final composite radius
            r_final = max(0.2, r_mean + rib_displacement + micro_ribs + root_flare_disp + cavity_disp + bark_pert)
            
            vx = axis_x + r_final * math.cos(theta)
            vy = axis_y + r_final * math.sin(theta)
            vz = z
            
            v = bm.verts.new(Vector((vx, vy, vz)))
            verts_in_ring.append(v)
            
        ring_verts.append(verts_in_ring)
    
    # Bridge rings with quad faces
    for r in range(rings - 1):
        r0 = ring_verts[r]
        r1 = ring_verts[r + 1]
        for s in range(segs):
            s_next = (s + 1) % segs
            v1 = r0[s]
            v2 = r0[s_next]
            v3 = r1[s_next]
            v4 = r1[s]
            bm.faces.new((v1, v2, v3, v4))
            
    # Bottom cap / ground seal
    center_bottom = bm.verts.new(Vector((axis_x, axis_y, 0.0)))
    for s in range(segs):
        s_next = (s + 1) % segs
        bm.faces.new((center_bottom, ring_verts[0][s_next], ring_verts[0][s]))
        
    return ring_verts[-1] # Return top rim vertices for bifurcation attachment


# ==============================================================================
# 4. RECURSIVE 4-TIER BRANCHING GENERATOR (BMESH + LOFTER)
# ==============================================================================

def extrude_branch_mesh(bm, curve_points, radii, radial_segs=16, uv_layer=None):
    """
    Lofts a smooth, continuous quad-pipe mesh along an arbitrary 3D curve using Bishop Parallel Transport frames.
    Avoids twisting, pinching, and self-intersection artifacts.
    """
    if len(curve_points) < 2:
        return []
    
    frames = compute_bishop_frames(curve_points)
    rings = []
    
    total_len = 0.0
    dists = [0.0]
    for i in range(1, len(curve_points)):
        total_len += (curve_points[i] - curve_points[i-1]).length
        dists.append(total_len)
        
    for i, (pt, r, (t, n, b)) in enumerate(zip(curve_points, radii, frames)):
        v_dist = dists[i]
        ring = []
        for s in range(radial_segs):
            phi = (s / float(radial_segs)) * 2.0 * math.pi
            # Sinuous micro-irregularity on branch cross section
            r_pert = r * (1.0 + 0.08 * math.cos(phi * 3.0 + i * 0.4))
            offset = (n * math.cos(phi) + b * math.sin(phi)) * r_pert
            vert = bm.verts.new(pt + offset)
            ring.append(vert)
        rings.append(ring)
        
    # Quad skinning
    for i in range(len(rings) - 1):
        r0 = rings[i]
        r1 = rings[i + 1]
        for s in range(radial_segs):
            s_next = (s + 1) % radial_segs
            f = bm.faces.new((r0[s], r0[s_next], r1[s_next], r1[s]))
            f.smooth = True
            
    # Cap end
    tip_vert = bm.verts.new(curve_points[-1])
    for s in range(radial_segs):
        s_next = (s + 1) % radial_segs
        bm.faces.new((tip_vert, rings[-1][s], rings[-1][s_next]))
        
    return rings

class BranchHierarchyBuilder:
    """
    Constructs the 4-tier botanical architecture:
      L1: Massive ascending-twisting scaffold leaders (8-14m)
      L2: Horizontal shelf plates
      L3: Weeping gravitropic twigs
      L4: Attachment anchors for needle fronds & Spanish moss
    """
    def __init__(self, cfg):
        self.cfg = cfg
        self.l1_branches = []
        self.l2_branches = []
        self.l3_branches = []
        self.moss_anchors = []
        
    def build_hierarchy(self, trunk_top_center):
        cfg = self.cfg
        
        # -------------------------------------------------------------
        # TIER 1: Massive Scaffold Leaders (L1)
        # -------------------------------------------------------------
        leader_angles = [(i * 2.0 * math.pi / cfg.num_leaders) + random.uniform(-0.25, 0.25) 
                         for i in range(cfg.num_leaders)]
        
        for idx, base_angle in enumerate(leader_angles):
            pts = [trunk_top_center.copy()]
            radii = [cfg.leader_rad_start]
            
            # Initial launch direction: outward and upward (45° to 65° from horizontal)
            elev = random.uniform(0.75, 1.15) # radians from horizontal
            dir_vec = Vector((
                math.cos(base_angle) * math.cos(elev),
                math.sin(base_angle) * math.cos(elev),
                math.sin(elev)
            )).normalized()
            
            curr_pos = trunk_top_center.copy()
            step_len = cfg.leader_length / float(cfg.leader_steps)
            
            for s in range(1, cfg.leader_steps + 1):
                t_ratio = s / float(cfg.leader_steps)
                # Leonardo da Vinci taper model: r(t) = r0 * (1 - t)^(1/d)
                r_curr = cfg.leader_rad_start * math.pow(max(0.01, 1.0 - 0.85 * t_ratio), 1.0 / cfg.da_vinci_exponent)
                
                # Sinuous snaking curvature + curl noise
                c_noise = curl_noise_3d(curr_pos, scale=0.15) * 0.45
                # Phototropic outward spreading + slight upward pull
                outward = Vector((curr_pos.x, curr_pos.y, 0)).normalized()
                upward = Vector((0, 0, 1))
                
                step_dir = (dir_vec + outward * 0.25 + upward * 0.15 + c_noise).normalized()
                curr_pos = curr_pos + step_dir * step_len
                dir_vec = step_dir
                
                pts.append(curr_pos.copy())
                radii.append(max(0.12, r_curr))
                
                # Collect potential Spanish moss attachment points along under-arch of L1
                if 3 <= s <= cfg.leader_steps - 3 and random.random() < 0.45:
                    self.moss_anchors.append((curr_pos.copy(), step_dir.copy()))
                    
            self.l1_branches.append((pts, radii))
            
        # Also add 5-8 lower massive horizontal scaffold limbs
        for i in range(cfg.num_scaffold_limbs):
            ang = random.uniform(0, 2.0 * math.pi)
            h_attach = cfg.trunk_height * random.uniform(0.6, 0.95)
            attach_pt = Vector((
                math.cos(ang) * (cfg.bifurcation_radius * 0.85),
                math.sin(ang) * (cfg.bifurcation_radius * 0.85),
                h_attach
            ))
            
            pts = [attach_pt]
            l_len = random.uniform(7.0, 11.5)
            steps = 18
            step_len = l_len / float(steps)
            r_start = random.uniform(0.45, 0.75)
            radii = [r_start]
            
            # Horizontal-to-descending arch
            dir_vec = Vector((math.cos(ang), math.sin(ang), random.uniform(-0.15, 0.25))).normalized()
            curr_pos = attach_pt.copy()
            
            for s in range(1, steps + 1):
                t_ratio = s / float(steps)
                r_curr = r_start * math.pow(max(0.01, 1.0 - 0.85 * t_ratio), 1.0 / cfg.da_vinci_exponent)
                c_noise = curl_noise_3d(curr_pos, scale=0.2) * 0.35
                grav = Vector((0, 0, -0.22 * smoothstep(0.3, 1.0, t_ratio)))
                
                step_dir = (dir_vec + grav + c_noise).normalized()
                curr_pos = curr_pos + step_dir * step_len
                dir_vec = step_dir
                pts.append(curr_pos.copy())
                radii.append(max(0.08, r_curr))
                
                if random.random() < 0.5:
                    self.moss_anchors.append((curr_pos.copy(), step_dir.copy()))
                    
            self.l1_branches.append((pts, radii))
            
        # -------------------------------------------------------------
        # TIER 2: Secondary Canopy Shelves (L2)
        # -------------------------------------------------------------
        for l1_pts, l1_rads in self.l1_branches:
            num_pts = len(l1_pts)
            for k in range(cfg.l2_per_leader):
                # Spawn along upper 70% of L1 limb
                idx = random.randint(int(num_pts * 0.25), num_pts - 2)
                attach_pt = l1_pts[idx]
                r_parent = l1_rads[idx]
                
                # Radiate laterally to form broad horizontal shelves
                parent_dir = (l1_pts[idx+1] - l1_pts[idx]).normalized()
                side_sign = 1.0 if (k % 2 == 0) else -1.0
                normal_ref = Vector((0, 0, 1))
                lateral_dir = parent_dir.cross(normal_ref).normalized() * side_sign
                
                l2_dir = (lateral_dir * cfg.l2_horizontal_bias + parent_dir * 0.4 + Vector((0, 0, 0.15))).normalized()
                
                l2_len = random.uniform(cfg.l2_length_min, cfg.l2_length_max)
                steps = cfg.l2_steps
                step_len = l2_len / float(steps)
                
                pts = [attach_pt.copy()]
                r_start = r_parent * 0.55
                radii = [r_start]
                curr_pos = attach_pt.copy()
                
                for s in range(1, steps + 1):
                    t_r = s / float(steps)
                    r_c = r_start * math.pow(max(0.01, 1.0 - 0.88 * t_r), 1.0 / cfg.da_vinci_exponent)
                    c_n = curl_noise_3d(curr_pos, scale=0.3) * 0.25
                    # Gentle arching shelf: rise slightly then flatten
                    arch = math.sin(t_r * math.pi) * 0.15
                    step_dir = (l2_dir + Vector((0, 0, arch)) + c_n).normalized()
                    curr_pos = curr_pos + step_dir * step_len
                    l2_dir = step_dir
                    pts.append(curr_pos.copy())
                    radii.append(max(0.04, r_c))
                    
                self.l2_branches.append((pts, radii))
                
        # -------------------------------------------------------------
        # TIER 3: Gravitropic Weeping Twigs (L3)
        # -------------------------------------------------------------
        for l2_pts, l2_rads in self.l2_branches:
            num_pts = len(l2_pts)
            for _ in range(cfg.l3_density):
                idx = random.randint(int(num_pts * 0.3), num_pts - 1)
                attach_pt = l2_pts[idx]
                r_parent = l2_rads[idx]
                
                # Weeping twigs hang downward under intense gravity
                side_dir = Vector((random.uniform(-1, 1), random.uniform(-1, 1), random.uniform(-0.2, 0.1))).normalized()
                pts = [attach_pt.copy()]
                r_start = r_parent * 0.5
                radii = [r_start]
                
                steps = cfg.l3_steps
                step_len = cfg.l3_length / float(steps)
                curr_pos = attach_pt.copy()
                dir_vec = side_dir
                
                for s in range(1, steps + 1):
                    t_r = s / float(steps)
                    r_c = r_start * (1.0 - 0.75 * t_r)
                    # Intense downward gravitropic acceleration
                    grav_pull = Vector((0, 0, -cfg.l3_gravitropism * (t_r * 1.6)))
                    step_dir = (dir_vec + grav_pull + curl_noise_3d(curr_pos, scale=0.5)*0.15).normalized()
                    curr_pos = curr_pos + step_dir * step_len
                    dir_vec = step_dir
                    pts.append(curr_pos.copy())
                    radii.append(max(0.015, r_c))
                    
                self.l3_branches.append((pts, radii))


# ==============================================================================
# 5. HIGH-DENSITY WEEPING FOLIAGE CARDS (L4)
# ==============================================================================

def generate_weeping_foliage_mesh(bm, l3_branches, cfg):
    """
    Creates hundreds to thousands of curved, multi-segment weeping needle spray cards (Taxodium mucronatum fronds).
    Applies custom spherical normal editing to ensure lush, soft, volumetric light transmission.
    """
    frond_len = cfg.frond_length
    frond_w = cfg.frond_width
    segs = cfg.frond_segments
    
    # Custom layers: UV and Vertex Colors
    uv_layer = bm.loops.layers.uv.verify()
    color_layer = bm.loops.layers.color.verify()
    
    tree_center = Vector((0, 0, cfg.trunk_height * 2.5))
    
    for pts, radii in l3_branches:
        if len(pts) < 3:
            continue
        
        # Attach fronds along the lower half of each weeping twig
        num_pts = len(pts)
        for f_idx in range(cfg.foliage_fronds_per_twig):
            pt_idx = random.randint(int(num_pts * 0.35), num_pts - 1)
            attach_pt = pts[pt_idx]
            stem_dir = (pts[min(pt_idx+1, num_pts-1)] - pts[max(0, pt_idx-1)]).normalized()
            
            # Frond orientation: cascading downward with natural spiral phyllotaxy
            spin_angle = (f_idx * 137.5 * math.pi / 180.0) + random.uniform(-0.3, 0.3)
            ref_up = Vector((0, 0, 1))
            side_axis = stem_dir.cross(ref_up).normalized()
            if side_axis.length < 1e-4:
                side_axis = Vector((1, 0, 0))
            
            rot_mat = Matrix.Rotation(spin_angle, 3, stem_dir)
            frond_side = (rot_mat @ side_axis).normalized()
            frond_down = stem_dir.lerp(Vector((0, 0, -1)), cfg.frond_droop).normalized()
            
            # Generate curved strip of quad segments
            prev_left = None
            prev_right = None
            curr_origin = attach_pt.copy()
            
            for seg in range(segs + 1):
                t_seg = seg / float(segs)
                # Parabolic droop along frond strip
                droop_offset = Vector((0, 0, -math.pow(t_seg, 2.0) * (frond_len * 0.4)))
                p_center = curr_origin + frond_down * (t_seg * frond_len) + droop_offset
                
                # Leaf width profile (tapered at base and apex)
                w_curr = math.sin(t_seg * math.pi * 0.85 + 0.15) * (frond_w * 0.5)
                
                p_left = p_center - frond_side * w_curr
                p_right = p_center + frond_side * w_curr
                
                vl = bm.verts.new(p_left)
                vr = bm.verts.new(p_right)
                
                # Calculate modified normal (spherical outward puff for cloud-like canopy shading)
                norm_left = (p_left - tree_center).normalized()
                norm_right = (p_right - tree_center).normalized()
                vl.normal = norm_left
                vr.normal = norm_right
                
                if prev_left and prev_right:
                    face = bm.faces.new((prev_left, prev_right, vr, vl))
                    face.smooth = True
                    
                    # UV Coordinates: (u: [0..1] across width, v: [0..1] along frond length)
                    v_prev = (seg - 1) / float(segs)
                    v_now = t_seg
                    
                    for loop in face.loops:
                        vert = loop.vert
                        if vert == prev_left:
                            loop[uv_layer].uv = Vector((0.0, v_prev))
                            loop[color_layer] = (0.35, 0.65, 0.22, 1.0) # Base green
                        elif vert == prev_right:
                            loop[uv_layer].uv = Vector((1.0, v_prev))
                            loop[color_layer] = (0.35, 0.65, 0.22, 1.0)
                        elif vert == vr:
                            loop[uv_layer].uv = Vector((1.0, v_now))
                            loop[color_layer] = (0.75, 0.88, 0.35, 1.0) # Vibrant fresh tip
                        elif vert == vl:
                            loop[uv_layer].uv = Vector((0.0, v_now))
                            loop[color_layer] = (0.75, 0.88, 0.35, 1.0)
                            
                prev_left = vl
                prev_right = vr


# ==============================================================================
# 6. SPANISH MOSS (TILLANDSIA USNEOIDES) CATENARY GENERATOR
# ==============================================================================

def generate_spanish_moss_mesh(bm, moss_anchors, cfg):
    """
    Synthesizes hanging festoons and weeping beards of Spanish moss (Tillandsia usneoides).
    Uses perturbed catenary mathematics, micro-spirals, and multi-strand clustering.
    """
    uv_layer = bm.loops.layers.uv.verify()
    color_layer = bm.loops.layers.color.verify()
    
    for anchor_pos, branch_dir in moss_anchors[:cfg.moss_clusters]:
        num_strands = random.randint(3, cfg.moss_strands_per_cluster)
        
        for _ in range(num_strands):
            hang_len = random.uniform(cfg.moss_length_min, cfg.moss_length_max)
            steps = 14
            
            # Slight random offset along branch underside
            offset_pos = anchor_pos + Vector((
                random.uniform(-0.25, 0.25),
                random.uniform(-0.25, 0.25),
                random.uniform(-0.15, 0.05)
            ))
            
            strand_pts = []
            strand_widths = []
            
            # Strand catenary points with micro-spiraling
            phase = random.uniform(0, 2.0 * math.pi)
            curl_freq = cfg.moss_curl_frequency
            curl_amp = cfg.moss_curl_amplitude
            
            for s in range(steps + 1):
                t = s / float(steps)
                z_drop = t * hang_len
                # Sinuous wavy spiral
                curl_x = math.sin(t * curl_freq * math.pi + phase) * curl_amp * (1.0 - t * 0.3)
                curl_y = math.cos(t * curl_freq * math.pi + phase) * curl_amp * (1.0 - t * 0.3)
                # Wind drift
                drift_x = math.sin(t * math.pi * 0.5) * 0.2
                
                pt = offset_pos + Vector((curl_x + drift_x, curl_y, -z_drop))
                strand_pts.append(pt)
                
                # Width tapers towards bottom tip
                w = math.sin(t * math.pi * 0.9 + 0.1) * 0.045
                strand_widths.append(max(0.008, w))
                
            # Loft flat ribbon facing outward
            prev_l, prev_r = None, None
            for s in range(steps + 1):
                pt = strand_pts[s]
                w = strand_widths[s]
                t = s / float(steps)
                
                vl = bm.verts.new(pt + Vector((-w, 0, 0)))
                vr = bm.verts.new(pt + Vector((w, 0, 0)))
                
                if prev_l and prev_r:
                    face = bm.faces.new((prev_l, prev_r, vr, vl))
                    face.smooth = True
                    for loop in face.loops:
                        vert = loop.vert
                        v_coord = t
                        u_coord = 0.0 if (vert in (prev_l, vl)) else 1.0
                        loop[uv_layer].uv = Vector((u_coord, v_coord))
                        # Silvery pale-sage epiphyte color with alpha falloff
                        loop[color_layer] = (0.72, 0.78, 0.70, 1.0 - t * 0.35)
                        
                prev_l = vl
                prev_r = vr


# ==============================================================================
# 7. PROCEDURAL SHADER NODE NETWORKS (BLENDER 5.2 / PRINCIPLED BSDF V2)
# ==============================================================================

def create_fluted_cypress_bark_material():
    """Constructs a high-fidelity procedural Montezuma Cypress bark shader in Blender 5.2."""
    mat_name = "M_Ahuehuete_Bark"
    mat = bpy.data.materials.get(mat_name) or bpy.data.materials.new(name=mat_name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()
    
    # 1. Output & Principled BSDF
    node_out = nodes.new(type='ShaderNodeOutputMaterial')
    node_out.location = (800, 0)
    
    node_bsdf = nodes.new(type='ShaderNodeBsdfPrincipled')
    node_bsdf.location = (500, 0)
    node_bsdf.inputs['Roughness'].default_value = 0.88
    
    # 2. Coordinates & Mapping
    node_texcoord = nodes.new(type='ShaderNodeTexCoord')
    node_texcoord.location = (-1000, 0)
    
    node_mapping = nodes.new(type='ShaderNodeMapping')
    node_mapping.location = (-800, 0)
    node_mapping.inputs['Scale'].default_value = (1.0, 1.0, 6.0) # Vertical elongation for stringy fibrous bark
    links.new(node_texcoord.outputs['Object'], node_mapping.inputs['Vector'])
    
    # 3. Deep Fissure Noise & Voronoi
    node_voronoi = nodes.new(type='ShaderNodeTexVoronoi')
    node_voronoi.location = (-550, 200)
    node_voronoi.inputs['Scale'].default_value = 3.5
    links.new(node_mapping.outputs['Vector'], node_voronoi.inputs['Vector'])
    
    node_noise = nodes.new(type='ShaderNodeTexNoise')
    node_noise.location = (-550, -150)
    node_noise.inputs['Scale'].default_value = 8.0
    node_noise.inputs['Detail'].default_value = 6.0
    node_noise.inputs['Roughness'].default_value = 0.72
    links.new(node_mapping.outputs['Vector'], node_noise.inputs['Vector'])
    
    # 4. Color Ramp (Warm Cinnamon Brown -> Weathered Ash Grey in Furrows)
    node_cramp = nodes.new(type='ShaderNodeValToRGB')
    node_cramp.location = (-250, 100)
    node_cramp.color_ramp.elements[0].position = 0.25
    node_cramp.color_ramp.elements[0].color = (0.18, 0.12, 0.08, 1.0) # Deep crevice dark brown
    node_cramp.color_ramp.elements[1].position = 0.75
    node_cramp.color_ramp.elements[1].color = (0.42, 0.32, 0.26, 1.0) # Warm reddish fibrous ridge
    
    node_mix = nodes.new(type='ShaderNodeMix')
    node_mix.data_type = 'FLOAT'
    node_mix.location = (-350, 0)
    links.new(node_voronoi.outputs['Distance'], node_mix.inputs[6])
    links.new(node_noise.outputs['Fac'], node_mix.inputs[7])
    links.new(node_mix.outputs['Result'], node_cramp.inputs['Fac'])
    
    # 5. Connect to BSDF Base Color & Bump
    links.new(node_cramp.outputs['Color'], node_bsdf.inputs['Base Color'])
    
    node_bump = nodes.new(type='ShaderNodeBump')
    node_bump.location = (200, -200)
    node_bump.inputs['Strength'].default_value = 0.65
    node_bump.inputs['Distance'].default_value = 0.12
    links.new(node_mix.outputs['Result'], node_bump.inputs['Height'])
    links.new(node_bump.outputs['Normal'], node_bsdf.inputs['Normal'])
    
    links.new(node_bsdf.outputs['BSDF'], node_out.inputs['Surface'])
    return mat

def create_weeping_needle_material():
    """Constructs a translucent Subsurface-Scattering needle spray material in Blender 5.2."""
    mat_name = "M_Ahuehuete_Needles"
    mat = bpy.data.materials.get(mat_name) or bpy.data.materials.new(name=mat_name)
    mat.use_nodes = True
    mat.blend_method = 'CLIP'
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()
    
    node_out = nodes.new(type='ShaderNodeOutputMaterial')
    node_out.location = (800, 0)
    
    node_bsdf = nodes.new(type='ShaderNodeBsdfPrincipled')
    node_bsdf.location = (450, 0)
    node_bsdf.inputs['Roughness'].default_value = 0.35
    # Subsurface Translucency for thin needle fronds
    node_bsdf.inputs['Subsurface Weight'].default_value = 0.42
    node_bsdf.inputs['Subsurface Radius'].default_value = (0.65, 0.85, 0.25)
    
    # Vertex Color input for chlorophyll gradient
    node_vcol = nodes.new(type='ShaderNodeAttribute')
    node_vcol.location = (-400, 100)
    node_vcol.attribute_name = "Col"
    
    # Color Ramp for botanical cypress needle tone
    node_cramp = nodes.new(type='ShaderNodeValToRGB')
    node_cramp.location = (-150, 100)
    node_cramp.color_ramp.elements[0].position = 0.1
    node_cramp.color_ramp.elements[0].color = (0.12, 0.28, 0.08, 1.0) # Deep cypress evergreen
    node_cramp.color_ramp.elements[1].position = 0.9
    node_cramp.color_ramp.elements[1].color = (0.45, 0.62, 0.18, 1.0) # Feathery chartreuse fresh growth
    
    links.new(node_vcol.outputs['Fac'], node_cramp.inputs['Fac'])
    links.new(node_cramp.outputs['Color'], node_bsdf.inputs['Base Color'])
    links.new(node_cramp.outputs['Color'], node_bsdf.inputs['Subsurface Color'])
    
    links.new(node_bsdf.outputs['BSDF'], node_out.inputs['Surface'])
    return mat

def create_spanish_moss_material():
    """Constructs a translucent pale-sage Tillandsia usneoides shader."""
    mat_name = "M_Spanish_Moss"
    mat = bpy.data.materials.get(mat_name) or bpy.data.materials.new(name=mat_name)
    mat.use_nodes = True
    mat.blend_method = 'BLEND'
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()
    
    node_out = nodes.new(type='ShaderNodeOutputMaterial')
    node_out.location = (600, 0)
    
    node_bsdf = nodes.new(type='ShaderNodeBsdfPrincipled')
    node_bsdf.location = (250, 0)
    node_bsdf.inputs['Base Color'].default_value = (0.62, 0.70, 0.58, 1.0) # Silvery pale sage
    node_bsdf.inputs['Roughness'].default_value = 0.95
    node_bsdf.inputs['Sheen Weight'].default_value = 0.85 # Epiphytic trichome fuzz
    node_bsdf.inputs['Sheen Tint'].default_value = (0.85, 0.92, 0.85, 1.0)
    node_bsdf.inputs['Subsurface Weight'].default_value = 0.55
    
    links.new(node_bsdf.outputs['BSDF'], node_out.inputs['Surface'])
    return mat


# ==============================================================================
# 8. MASTER GENERATOR PIPELINE & BLENDER OPERATOR
# ==============================================================================

def generate_full_montezuma_cypress(cfg=None):
    """
    Executes the entire Montezuma Cypress botanical generation pipeline:
      1. Initializes configuration and seeds
      2. Creates fluted muscular trunk bole
      3. Constructs 4-tier recursive branching hierarchy
      4. Builds weeping foliage frond cards
      5. Synthesizes draped Spanish moss festoons
      6. Applies procedural materials and organizes scene collections
    """
    if cfg is None:
        cfg = AhuehueteConfig()
        
    print(f"[MontezumaCypress] Starting procedural generation (Seed: {cfg.seed})...")
    
    # 1. Setup Collection
    col_name = "Montezuma_Cypress_Ahuehuete"
    col = bpy.data.collections.get(col_name) or bpy.data.collections.new(name=col_name)
    if col.name not in bpy.context.scene.collection.children:
        bpy.context.scene.collection.children.link(col)
        
    # 2. Generate Trunk & Branches Mesh
    bm_tree = bmesh.new()
    top_rim = generate_montezuma_trunk(bm_tree, cfg)
    
    # Compute center of top rim for bifurcation anchor
    top_center = Vector((0, 0, 0))
    for v in top_rim:
        top_center += v.co
    top_center /= float(len(top_rim))
    
    # Build 4-tier Branch Hierarchy
    hierarchy = BranchHierarchyBuilder(cfg)
    hierarchy.build_hierarchy(top_center)
    
    # Loft L1 Leaders & Scaffold Limbs
    for pts, rads in hierarchy.l1_branches:
        extrude_branch_mesh(bm_tree, pts, rads, radial_segs=16)
        
    # Loft L2 Canopy Shelves
    for pts, rads in hierarchy.l2_branches:
        extrude_branch_mesh(bm_tree, pts, rads, radial_segs=12)
        
    # Loft L3 Weeping Twigs
    for pts, rads in hierarchy.l3_branches:
        extrude_branch_mesh(bm_tree, pts, rads, radial_segs=8)
        
    # Finalize Tree Wood Mesh
    mesh_wood = bpy.data.meshes.new("Ahuehuete_Wood_Mesh")
    bm_tree.to_mesh(mesh_wood)
    bm_tree.free()
    
    obj_wood = bpy.data.objects.new("Ahuehuete_Trunk_Canopy", mesh_wood)
    col.objects.link(obj_wood)
    
    # Assign Bark Material
    mat_bark = create_fluted_cypress_bark_material()
    obj_wood.data.materials.append(mat_bark)
    
    # 3. Generate Weeping Foliage Sprays (L4)
    if cfg.generate_foliage:
        bm_foliage = bmesh.new()
        generate_weeping_foliage_mesh(bm_foliage, hierarchy.l3_branches, cfg)
        
        mesh_foliage = bpy.data.meshes.new("Ahuehuete_Foliage_Mesh")
        bm_foliage.to_mesh(mesh_foliage)
        bm_foliage.free()
        
        obj_foliage = bpy.data.objects.new("Ahuehuete_Weeping_Foliage", mesh_foliage)
        col.objects.link(obj_foliage)
        obj_foliage.parent = obj_wood
        
        mat_foliage = create_weeping_needle_material()
        obj_foliage.data.materials.append(mat_foliage)
        
    # 4. Generate Spanish Moss Festoons
    if cfg.generate_moss and len(hierarchy.moss_anchors) > 0:
        bm_moss = bmesh.new()
        generate_spanish_moss_mesh(bm_moss, hierarchy.moss_anchors, cfg)
        
        mesh_moss = bpy.data.meshes.new("Ahuehuete_Moss_Mesh")
        bm_moss.to_mesh(mesh_moss)
        bm_moss.free()
        
        obj_moss = bpy.data.objects.new("Ahuehuete_Spanish_Moss", mesh_moss)
        col.objects.link(obj_moss)
        obj_moss.parent = obj_wood
        
        mat_moss = create_spanish_moss_material()
        obj_moss.data.materials.append(mat_moss)
        
    # 5. Apply Modifiers (Subdivision & Smooth Shading)
    for obj in (obj_wood,):
        bpy.context.view_layer.objects.active = obj
        obj.select_set(True)
        # Smooth normals
        for poly in obj.data.polygons:
            poly.use_smooth = True
            
    print("[MontezumaCypress] Procedural generation complete.")
    return obj_wood


# ==============================================================================
# 9. BLENDER UI OPERATOR REGISTRATION
# ==============================================================================

class OBJECT_OT_generate_montezuma_cypress(bpy.types.Operator):
    """Generate a realistic procedural Montezuma Cypress (Ahuehuete) tree"""
    bl_idname = "mesh.generate_montezuma_cypress"
    bl_label = "Generate Montezuma Cypress"
    bl_options = {'REGISTER', 'UNDO'}
    
    seed: bpy.props.IntProperty(name="Random Seed", default=42, min=0, max=999999)
    trunk_height: bpy.props.FloatProperty(name="Trunk Height (m)", default=4.2, min=1.5, max=10.0)
    base_radius: bpy.props.FloatProperty(name="Base Trunk Radius (m)", default=2.8, min=0.8, max=8.0)
    num_muscle_cables: bpy.props.IntProperty(name="Muscular Fluting Columns", default=7, min=3, max=16)
    cable_depth: bpy.props.FloatProperty(name="Fluting Depth", default=0.38, min=0.05, max=1.0)
    num_leaders: bpy.props.IntProperty(name="Primary Leaders (L1)", default=3, min=2, max=5)
    weeping_intensity: bpy.props.FloatProperty(name="Weeping Gravitropism", default=0.82, min=0.1, max=1.0)
    generate_foliage: bpy.props.BoolProperty(name="Generate Weeping Foliage", default=True)
    generate_moss: bpy.props.BoolProperty(name="Generate Spanish Moss", default=True)
    
    def execute(self, context):
        cfg = AhuehueteConfig(seed=self.seed)
        cfg.trunk_height = self.trunk_height
        cfg.base_radius = self.base_radius
        cfg.num_muscle_cables = self.num_muscle_cables
        cfg.cable_depth = self.cable_depth
        cfg.num_leaders = self.num_leaders
        cfg.l3_gravitropism = self.weeping_intensity
        cfg.generate_foliage = self.generate_foliage
        cfg.generate_moss = self.generate_moss
        
        generate_full_montezuma_cypress(cfg)
        self.report({'INFO'}, "Montezuma Cypress (Ahuehuete) generated successfully.")
        return {'FINISHED'}


def menu_func(self, context):
    self.layout.operator(OBJECT_OT_generate_montezuma_cypress.bl_idname, text="Montezuma Cypress (Ahuehuete)", icon='OUTLINER_OB_MESH')

def register():
    bpy.utils.register_class(OBJECT_OT_generate_montezuma_cypress)
    bpy.types.VIEW3D_MT_mesh_add.append(menu_func)

def unregister():
    bpy.utils.unregister_class(OBJECT_OT_generate_montezuma_cypress)
    bpy.types.VIEW3D_MT_mesh_add.remove(menu_func)

if __name__ == "__main__":
    # If run in Blender Scripting Editor, execute directly
    register()
    cfg = AhuehueteConfig(seed=1337)
    generate_full_montezuma_cypress(cfg)
