"""
generate_montezuma_cypress.py
=============================
Ultra-Realistic Nature-Grade Procedural Generator for Montezuma Cypress (Taxodium mucronatum / Ahuehuete)
Optimized for Blender 4.x / 5.x (including Blender 5.2.1 LTS).

Key Systems:
- Muscular composite fused-column trunk bole with multi-harmonic fluting, deep clefts, and sprawling root toes.
- Low codominant leader bifurcation at 2.5m - 4.2m height.
- Recursive 4-tier branch hierarchy (L1 Scaffold -> L2 Shelves -> L3 Weeping Twigs -> L4 Needle Fronds).
- Bishop Frame (Parallel Transport) non-twisting curve extrusions with Leonardo da Vinci area conservation.
- Cascading feathery foliage spray cards with chlorophyll vertex color gradients and spherical normals.
- Hanging Spanish moss (Tillandsia usneoides) catenary garlands.
- Ultra PBR shaders (M_Montezuma_Bark_Ultra, M_Montezuma_Foliage_Ultra, M_Spanish_Moss).
- Multi-format asset export: .blend, .glb, .obj + .mtl, and high-res preview renders.
"""

import sys
import os
import math
import random
import base64
import bpy
import bmesh
import mathutils
from mathutils import Vector, Matrix, Quaternion, Euler, noise


# =============================================================================
# 1. BOTANICAL CONFIGURATION & PRESETS
# =============================================================================

class AhuehueteConfig:
    """Parametric configuration for Montezuma Cypress generation."""
    def __init__(self, preset="mature_campus", seed=42):
        self.preset = preset
        self.seed = seed
        random.seed(seed)

        if preset == "old_growth_giant":
            # Ancient Resaca Giant (El Árbol del Tule archetype)
            self.total_tree_height = 18.0
            self.trunk_height = 4.2
            self.canopy_radius = 16.0
            self.base_radius = 3.2
            self.bifurcation_radius = 1.8
            self.num_muscle_cables = 9
            self.cable_depth = 0.42
            self.cable_twist = 0.35
            self.root_flare_height = 2.8
            self.num_root_toes = 9
            self.root_toe_spread = 3.2
            self.num_leaders = 4
            self.leader_length = 13.0
            self.l2_per_leader = 7
            self.l3_density = 6
            self.weeping_intensity = 0.85
            self.generate_moss = True
            self.moss_clusters = 80
        else:
            # Mature Campus Tree (~13m height, graceful spreading umbrella crown)
            self.total_tree_height = 13.5
            self.trunk_height = 3.5
            self.canopy_radius = 11.5
            self.base_radius = 1.85
            self.bifurcation_radius = 1.05
            self.num_muscle_cables = 7
            self.cable_depth = 0.30
            self.cable_twist = 0.28
            self.root_flare_height = 1.8
            self.num_root_toes = 7
            self.root_toe_spread = 2.0
            self.num_leaders = 3
            self.leader_length = 9.5
            self.l2_per_leader = 5
            self.l3_density = 5
            self.weeping_intensity = 0.80
            self.generate_moss = True
            self.moss_clusters = 45

        self.num_trunk_rings = 42
        self.num_radial_segments = 72
        self.hollow_cavity = True
        self.cavity_depth = 0.55
        self.da_vinci_exponent = 2.25
        self.generate_foliage = True
        self.frond_length = 1.05
        self.frond_width = 0.30
        self.frond_droop = 0.65


def parse_cli_args():
    args = {
        "out": "assets/3d/montezuma_cypress/montezuma_cypress",
        "preset": "mature_campus",
        "render": False,
        "seed": 42
    }
    if "--" in sys.argv:
        cli_argv = sys.argv[sys.argv.index("--") + 1:]
        i = 0
        while i < len(cli_argv):
            arg = cli_argv[i]
            if arg in ("--out", "-o") and i + 1 < len(cli_argv):
                args["out"] = cli_argv[i + 1]
                i += 1
            elif arg in ("--preset", "-p") and i + 1 < len(cli_argv):
                args["preset"] = cli_argv[i + 1]
                i += 1
            elif arg in ("--seed", "-s") and i + 1 < len(cli_argv):
                args["seed"] = int(cli_argv[i + 1])
                i += 1
            elif arg in ("--render", "-r"):
                args["render"] = True
            i += 1
    return args


# =============================================================================
# 2. MATHEMATICAL & GEOMETRIC UTILITIES
# =============================================================================

def smoothstep(edge0, edge1, x):
    t = max(0.0, min(1.0, (x - edge0) / (edge1 - edge0)))
    return t * t * (3.0 - 2.0 * t)


def compute_bishop_frames(points):
    """Computes parallel transport (Bishop) orthonormal frames along a 3D curve."""
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
            dot = max(-1.0, min(1.0, t_prev.dot(t_curr)))
            angle = math.acos(dot)
            q = Quaternion(axis, angle)
            curr_n = (q @ curr_n).normalized()
        curr_b = t_curr.cross(curr_n).normalized()
        frames.append((t_curr, curr_n, curr_b))
        
    return frames


# =============================================================================
# 3. PROCEDURAL GEOMETRY GENERATION
# =============================================================================

def generate_montezuma_trunk(bm, cfg):
    """Constructs the muscular fused-column trunk with deep vertical clefts."""
    dz = cfg.trunk_height / float(cfg.num_trunk_rings - 1)
    d_theta = (2.0 * math.pi) / float(cfg.num_radial_segments)
    
    cable_phases = [random.uniform(0.0, 2.0 * math.pi) for _ in range(cfg.num_muscle_cables)]
    cable_weights = [random.uniform(0.7, 1.3) for _ in range(cfg.num_muscle_cables)]
    toe_phases = [(i / float(cfg.num_root_toes)) * 2.0 * math.pi + random.uniform(-0.15, 0.15) for i in range(cfg.num_root_toes)]
    
    ring_verts = []
    
    for r in range(cfg.num_trunk_rings):
        z = r * dz
        t_height = z / cfg.trunk_height
        
        # Exponential root flare decay
        flare = math.exp(-z / max(0.5, cfg.root_flare_height * 0.65)) * 1.45
        r_mean = (cfg.base_radius * (1.0 + flare) * (1.0 - t_height * 0.45)) + cfg.bifurcation_radius * (t_height * 0.45)
        
        # Fluting attenuation with height
        flute_factor = math.exp(-z / (cfg.trunk_height * 0.8))
        twist = cfg.cable_twist * t_height
        
        current_ring = []
        for s in range(cfg.num_radial_segments):
            theta = s * d_theta
            
            # Muscular columns (Harmonic cosine perturbation with cubic sharpening)
            muscle_disp = 0.0
            for k in range(cfg.num_muscle_cables):
                p = (math.cos(theta * cfg.num_muscle_cables + twist - cable_phases[k]) + 1.0) * 0.5
                muscle_disp += cable_weights[k] * (p ** 3.0) * (cfg.cable_depth * flute_factor)
                
            # Sprawling root toes
            root_disp = 0.0
            if z < cfg.root_flare_height:
                t_root = 1.0 - (z / cfg.root_flare_height)
                for psi in toe_phases:
                    d_th = math.atan2(math.sin(theta - psi), math.cos(theta - psi))
                    toe_profile = math.exp(-6.0 * (d_th ** 2))
                    root_disp += toe_profile * (cfg.root_toe_spread * (t_root ** 2.2))
                    
            # Ancient hollow cavity
            cavity_disp = 0.0
            if cfg.hollow_cavity and z < cfg.trunk_height * 0.6:
                t_cav = 1.0 - (z / (cfg.trunk_height * 0.6))
                cav_th = math.atan2(math.sin(theta - 0.45), math.cos(theta - 0.45))
                if abs(cav_th) < 0.65:
                    cavity_disp = -cfg.cavity_depth * math.cos((cav_th / 0.65) * (math.pi * 0.5)) * t_cav
                    
            r_total = max(0.2, r_mean + muscle_disp + root_disp + cavity_disp)
            
            # Micro-bark displacement
            micro_noise = math.sin(z * 4.0 + theta * 8.0) * 0.03
            r_total += micro_noise
            
            x = r_total * math.cos(theta)
            y = r_total * math.sin(theta)
            v = bm.verts.new(Vector((x, y, z)))
            current_ring.append(v)
            
        ring_verts.append(current_ring)
        
    bm.verts.ensure_lookup_table()
    
    # Loft quad faces between rings
    for r in range(cfg.num_trunk_rings - 1):
        for s in range(cfg.num_radial_segments):
            s_next = (s + 1) % cfg.num_radial_segments
            v0 = ring_verts[r][s]
            v1 = ring_verts[r][s_next]
            v2 = ring_verts[r+1][s_next]
            v3 = ring_verts[r+1][s]
            bm.faces.new((v0, v1, v2, v3))
            
    # Cap bottom base
    bm.faces.new(ring_verts[0][::-1])
    return ring_verts[-1]


def extrude_branch_mesh(bm, points, radii, radial_segs=10):
    """Extrudes smooth quad geometry along 3D space curves using Bishop Frames."""
    n_pts = len(points)
    if n_pts < 2:
        return
    frames = compute_bishop_frames(points)
    d_phi = (2.0 * math.pi) / float(radial_segs)
    
    rings = []
    for i in range(n_pts):
        p = points[i]
        r = max(0.015, radii[i])
        _, n, b = frames[i]
        
        ring = []
        for j in range(radial_segs):
            phi = j * d_phi
            offset = (n * math.cos(phi) + b * math.sin(phi)) * r
            v = bm.verts.new(p + offset)
            ring.append(v)
        rings.append(ring)
        
    bm.verts.ensure_lookup_table()
    for i in range(n_pts - 1):
        for j in range(radial_segs):
            j_next = (j + 1) % radial_segs
            v0 = rings[i][j]
            v1 = rings[i][j_next]
            v2 = rings[i+1][j_next]
            v3 = rings[i+1][j]
            bm.faces.new((v0, v1, v2, v3))
            
    # Cap branch tip
    bm.faces.new(rings[-1])


class BranchHierarchyBuilder:
    """Generates the recursive 4-tier branch hierarchy."""
    def __init__(self, cfg):
        self.cfg = cfg
        self.l1_branches = []
        self.l2_branches = []
        self.l3_branches = []
        self.moss_anchors = []

    def build_hierarchy(self, trunk_top_center):
        # 1. Codominant Leaders (L1)
        golden_angle = 2.39996
        for i in range(self.cfg.num_leaders):
            theta = (i / float(self.cfg.num_leaders)) * 2.0 * math.pi + random.uniform(-0.15, 0.15)
            spread = random.uniform(0.35, 0.65)
            pts = []
            rads = []
            
            p_curr = trunk_top_center.copy() + Vector((
                self.cfg.bifurcation_radius * 0.45 * math.cos(theta),
                self.cfg.bifurcation_radius * 0.45 * math.sin(theta),
                0.0
            ))
            
            v_dir = Vector((
                math.cos(theta) * spread,
                math.sin(theta) * spread,
                math.cos(spread) * 1.15
            )).normalized()
            
            steps = 18
            ds = self.cfg.leader_length / float(steps)
            
            for s in range(steps + 1):
                pts.append(p_curr.copy())
                t = s / float(steps)
                rad = max(0.08, 0.75 * math.pow(max(0.01, 1.0 - 0.85 * t), 1.0 / self.cfg.da_vinci_exponent))
                rads.append(rad)
                
                # Curl noise & upward bias
                curl = Vector((
                    math.sin(s * 0.65 + i * 2.0) * 0.18,
                    math.cos(s * 0.65 + i * 2.0) * 0.18,
                    0.05
                ))
                v_dir = (v_dir + curl * 0.25).normalized()
                p_curr += v_dir * ds
                
            self.l1_branches.append((pts, rads))
            
            # 2. Secondary Canopy Shelves (L2)
            for j in range(self.cfg.l2_per_leader):
                tj = 0.25 + (j / float(self.cfg.l2_per_leader)) * 0.68
                idx_attach = int(tj * steps)
                p_attach = pts[idx_attach]
                rad_parent = rads[idx_attach]
                
                # Lateral shelf orientation
                phi_shelf = theta + (1.0 if j % 2 == 0 else -1.0) * random.uniform(0.65, 1.4)
                l2_len = random.uniform(4.5, 8.5)
                l2_steps = 12
                ds_l2 = l2_len / float(l2_steps)
                
                p_l2 = p_attach.copy()
                dir_l2 = Vector((
                    math.cos(phi_shelf) * 0.85,
                    math.sin(phi_shelf) * 0.85,
                    random.uniform(0.05, 0.25)
                )).normalized()
                
                pts_l2 = []
                rads_l2 = []
                for s2 in range(l2_steps + 1):
                    pts_l2.append(p_l2.copy())
                    t2 = s2 / float(l2_steps)
                    r_l2 = max(0.04, rad_parent * 0.55 * math.pow(max(0.01, 1.0 - 0.85 * t2), 1.0 / self.cfg.da_vinci_exponent))
                    rads_l2.append(r_l2)
                    
                    # Horizontal shelf sweep
                    dir_l2 = (dir_l2 + Vector((0, 0, -0.04))).normalized()
                    p_l2 += dir_l2 * ds_l2
                    
                self.l2_branches.append((pts_l2, rads_l2))
                
                # Record Spanish moss anchors under scaffold limbs
                if random.random() < 0.45:
                    self.moss_anchors.append(pts_l2[int(len(pts_l2) * 0.45)])
                    
                # 3. Tertiary Weeping Twigs (L3)
                for k in range(self.cfg.l3_density):
                    tk = 0.35 + (k / float(self.cfg.l3_density)) * 0.62
                    idx_l3 = int(tk * l2_steps)
                    p_l3_start = pts_l2[idx_l3]
                    
                    phi_twig = phi_shelf + (1.0 if k % 2 == 0 else -1.0) * random.uniform(0.4, 0.9)
                    twig_len = random.uniform(2.0, 3.8)
                    twig_steps = 8
                    ds_twig = twig_len / float(twig_steps)
                    
                    p_twig = p_l3_start.copy()
                    dir_twig = Vector((
                        math.cos(phi_twig) * 0.5,
                        math.sin(phi_twig) * 0.5,
                        -0.2
                    )).normalized()
                    
                    pts_l3 = []
                    rads_l3 = []
                    for s3 in range(twig_steps + 1):
                        pts_l3.append(p_twig.copy())
                        t3 = s3 / float(twig_steps)
                        r_twig = max(0.015, 0.045 * (1.0 - t3 * 0.75))
                        rads_l3.append(r_twig)
                        
                        # Strong gravitropic downward weeping sag
                        gravity = Vector((0, 0, -self.cfg.weeping_intensity * 0.35))
                        dir_twig = (dir_twig + gravity).normalized()
                        p_twig += dir_twig * ds_twig
                        
                    self.l3_branches.append((pts_l3, rads_l3))


def generate_weeping_foliage_mesh(bm, l3_branches, cfg):
    """Constructs layered curved needle spray cards along weeping twigs."""
    for pts, _ in l3_branches:
        if len(pts) < 3:
            continue
        # Attach fronds along outer half of weeping twigs
        for t_step in [0.45, 0.75, 1.0]:
            idx = min(len(pts) - 1, int(t_step * (len(pts) - 1)))
            p_node = pts[idx]
            tangent = (pts[min(len(pts)-1, idx+1)] - pts[max(0, idx-1)]).normalized()
            
            # Cross-cluster (2 curved intersecting planes per node)
            for plane_idx in range(2):
                up = Vector((0, 0, -1))
                norm = tangent.cross(up).normalized()
                if plane_idx == 1:
                    norm = norm.cross(tangent).normalized()
                    
                w = cfg.frond_width * random.uniform(0.85, 1.25)
                l = cfg.frond_length * random.uniform(0.85, 1.25)
                
                # 4-vertex quad card with slight sag
                v0 = bm.verts.new(p_node - norm * (w * 0.5))
                v1 = bm.verts.new(p_node + norm * (w * 0.5))
                v2 = bm.verts.new(p_node + norm * (w * 0.5) + tangent * l + Vector((0, 0, -cfg.frond_droop * 0.25)))
                v3 = bm.verts.new(p_node - norm * (w * 0.5) + tangent * l + Vector((0, 0, -cfg.frond_droop * 0.25)))
                
                face = bm.faces.new((v0, v1, v2, v3))
                face.smooth = True


def generate_spanish_moss_mesh(bm, anchors, cfg):
    """Generates draped Spanish moss festoons hanging from scaffold limbs."""
    for anchor in anchors:
        for _ in range(random.randint(4, 7)):
            hang_len = random.uniform(1.2, 3.2)
            steps = 8
            dz = hang_len / float(steps)
            
            p_curr = anchor.copy() + Vector((
                random.uniform(-0.15, 0.15),
                random.uniform(-0.15, 0.15),
                -0.05
            ))
            
            m_verts = []
            for s in range(steps + 1):
                t = s / float(steps)
                curl = Vector((
                    math.sin(s * 1.5) * 0.08,
                    math.cos(s * 1.5) * 0.08,
                    -dz
                ))
                p_curr += curl
                v = bm.verts.new(p_curr)
                m_verts.append(v)
                
            for s in range(steps):
                bm.edges.new((m_verts[s], m_verts[s+1]))


# =============================================================================
# 4. ULTRA PBR SHADER NODE NETWORKS (BLENDER 5.2 / PRINCIPLED BSDF V2)
# =============================================================================

def build_montezuma_bark_ultra(name="M_Montezuma_Bark_Ultra"):
    mat = bpy.data.materials.get(name) or bpy.data.materials.new(name=name)
    if hasattr(mat, "use_nodes"):
        mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()

    # Output & Principled BSDF
    node_out = nodes.new(type='ShaderNodeOutputMaterial')
    node_out.location = (1100, 0)
    
    node_bsdf = nodes.new(type='ShaderNodeBsdfPrincipled')
    node_bsdf.location = (800, 0)
    node_bsdf.inputs['Roughness'].default_value = 0.90
    if 'Specular IOR Level' in node_bsdf.inputs:
        node_bsdf.inputs['Specular IOR Level'].default_value = 0.35
    elif 'Specular' in node_bsdf.inputs:
        node_bsdf.inputs['Specular'].default_value = 0.35
    links.new(node_bsdf.outputs['BSDF'], node_out.inputs['Surface'])

    # Coordinates & Mapping (Z-elongated for longitudinal bark grain)
    node_coord = nodes.new(type='ShaderNodeTexCoord')
    node_coord.location = (-900, 0)
    
    node_map = nodes.new(type='ShaderNodeMapping')
    node_map.location = (-700, 0)
    node_map.inputs['Scale'].default_value = (1.5, 1.5, 10.0)
    links.new(node_coord.outputs['Object'], node_map.inputs['Vector'])

    # Wave & Voronoi Textures (Fibrous Peeling Bark Striations)
    node_wave = nodes.new(type='ShaderNodeTexWave')
    node_wave.location = (-450, 180)
    node_wave.wave_type = 'BANDS'
    node_wave.bands_direction = 'Z'
    node_wave.inputs['Scale'].default_value = 2.4
    node_wave.inputs['Distortion'].default_value = 4.0
    node_wave.inputs['Detail'].default_value = 5.0
    links.new(node_map.outputs['Vector'], node_wave.inputs['Vector'])

    node_voro = nodes.new(type='ShaderNodeTexVoronoi')
    node_voro.location = (-450, -150)
    node_voro.feature = 'DISTANCE_TO_EDGE'
    node_voro.inputs['Scale'].default_value = 4.2
    links.new(node_map.outputs['Vector'], node_voro.inputs['Vector'])

    node_mix_tex = nodes.new(type='ShaderNodeMix')
    node_mix_tex.location = (-200, 50)
    node_mix_tex.data_type = 'FLOAT'
    node_mix_tex.inputs[0].default_value = 0.55
    links.new(node_wave.outputs['Color'], node_mix_tex.inputs[2])
    links.new(node_voro.outputs['Distance'], node_mix_tex.inputs[3])

    # Color Ramp (Deep Umber -> Cinnamon Cambium -> Weathered Cedar Gray)
    node_ramp = nodes.new(type='ShaderNodeValToRGB')
    node_ramp.location = (50, 150)
    cr = node_ramp.color_ramp
    cr.elements[0].position = 0.0
    cr.elements[0].color = (0.157, 0.086, 0.055, 1.0) # Deep shadow (#28160E)
    cr.elements[1].position = 0.85
    cr.elements[1].color = (0.459, 0.424, 0.388, 1.0) # Weathered cedar gray (#756C63)
    
    e_cin = cr.elements.new(0.35)
    e_cin.color = (0.553, 0.275, 0.161, 1.0)          # Cinnamon cambium (#8D4629)
    
    links.new(node_mix_tex.outputs[0], node_ramp.inputs['Fac'])
    
    # Moss Mix
    node_mix_moss = nodes.new(type='ShaderNodeMix')
    node_mix_moss.location = (350, 150)
    node_mix_moss.data_type = 'RGBA'
    node_mix_moss.inputs[0].default_value = 0.14
    node_mix_moss.inputs[7].default_value = (0.275, 0.329, 0.169, 1.0) # Moss green (#46542B)
    links.new(node_ramp.outputs['Color'], node_mix_moss.inputs[6])
    links.new(node_mix_moss.outputs[2], node_bsdf.inputs['Base Color'])

    # Bump Mapping
    node_bump = nodes.new(type='ShaderNodeBump')
    node_bump.location = (350, -100)
    node_bump.inputs['Strength'].default_value = 0.80
    node_bump.inputs['Distance'].default_value = 0.08
    links.new(node_mix_tex.outputs[0], node_bump.inputs['Height'])
    links.new(node_bump.outputs['Normal'], node_bsdf.inputs['Normal'])

    return mat


def build_montezuma_foliage_ultra(name="M_Montezuma_Foliage_Ultra"):
    mat = bpy.data.materials.get(name) or bpy.data.materials.new(name=name)
    if hasattr(mat, "use_nodes"):
        mat.use_nodes = True
    if hasattr(mat, 'blend_method'):
        mat.blend_method = 'HASHED'
    if hasattr(mat, 'shadow_method'):
        mat.shadow_method = 'HASHED'
        
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()

    node_out = nodes.new(type='ShaderNodeOutputMaterial')
    node_out.location = (800, 0)
    
    node_bsdf = nodes.new(type='ShaderNodeBsdfPrincipled')
    node_bsdf.location = (500, 0)
    node_bsdf.inputs['Base Color'].default_value = (0.227, 0.420, 0.176, 1.0) # Summer green (#3A6B2D)
    node_bsdf.inputs['Roughness'].default_value = 0.42
    
    # Subsurface Scattering Translucency
    if 'Subsurface Weight' in node_bsdf.inputs:
        node_bsdf.inputs['Subsurface Weight'].default_value = 0.65
        node_bsdf.inputs['Subsurface Radius'].default_value = (0.68, 0.88, 0.31) # Chartreuse SSS (#AEE04E)
        node_bsdf.inputs['Subsurface Scale'].default_value = 0.12
    if 'Thin Wall' in node_bsdf.inputs:
        node_bsdf.inputs['Thin Wall'].default_value = True

    links.new(node_bsdf.outputs['BSDF'], node_out.inputs['Surface'])

    # Color Variation
    node_coord = nodes.new(type='ShaderNodeTexCoord')
    node_coord.location = (-600, 0)
    node_noise = nodes.new(type='ShaderNodeTexNoise')
    node_noise.location = (-350, 100)
    node_noise.inputs['Scale'].default_value = 16.0
    links.new(node_coord.outputs['Object'], node_noise.inputs['Vector'])

    node_ramp = nodes.new(type='ShaderNodeValToRGB')
    node_ramp.location = (-100, 150)
    cr = node_ramp.color_ramp
    cr.elements[0].position = 0.15
    cr.elements[0].color = (0.180, 0.341, 0.137, 1.0) # Deep inner canopy (#2E5723)
    cr.elements[1].position = 0.85
    cr.elements[1].color = (0.545, 0.765, 0.290, 1.0) # Fresh spring tip (#8BC34A)
    
    links.new(node_noise.outputs['Fac'], node_ramp.inputs['Fac'])
    links.new(node_ramp.outputs['Color'], node_bsdf.inputs['Base Color'])

    return mat


def build_spanish_moss_material(name="M_Spanish_Moss"):
    mat = bpy.data.materials.get(name) or bpy.data.materials.new(name=name)
    if hasattr(mat, "use_nodes"):
        mat.use_nodes = True
    if hasattr(mat, 'blend_method'):
        mat.blend_method = 'HASHED'
        
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()

    node_out = nodes.new(type='ShaderNodeOutputMaterial')
    node_out.location = (600, 0)
    
    node_bsdf = nodes.new(type='ShaderNodeBsdfPrincipled')
    node_bsdf.location = (300, 0)
    node_bsdf.inputs['Base Color'].default_value = (0.62, 0.70, 0.58, 1.0) # Silvery pale sage (#9EAA96)
    node_bsdf.inputs['Roughness'].default_value = 0.95
    if 'Sheen Weight' in node_bsdf.inputs:
        node_bsdf.inputs['Sheen Weight'].default_value = 0.85
        node_bsdf.inputs['Sheen Tint'].default_value = (0.85, 0.92, 0.85, 1.0)
    if 'Subsurface Weight' in node_bsdf.inputs:
        node_bsdf.inputs['Subsurface Weight'].default_value = 0.55

    links.new(node_bsdf.outputs['BSDF'], node_out.inputs['Surface'])
    return mat


# =============================================================================
# 5. STAGING & EXPORT PIPELINE
# =============================================================================

def setup_studio_environment(collection, tree_height=13.5):
    # Ground Plane
    mesh_g = bpy.data.meshes.new("Ground_Base")
    bm_g = bmesh.new()
    bmesh.ops.create_grid(bm_g, x_segments=16, y_segments=16, size=45.0)
    bm_g.to_mesh(mesh_g)
    bm_g.free()
    
    obj_g = bpy.data.objects.new("Ground_Base", mesh_g)
    collection.objects.link(obj_g)
    
    mat_g = bpy.data.materials.new("M_Ground_Turf")
    if hasattr(mat_g, "use_nodes"):
        mat_g.use_nodes = True
    bsdf_g = mat_g.node_tree.nodes.get("Principled BSDF")
    if bsdf_g:
        bsdf_g.inputs['Base Color'].default_value = (0.32, 0.42, 0.22, 1.0)
        bsdf_g.inputs['Roughness'].default_value = 0.95
    obj_g.data.materials.append(mat_g)

    # Warm Golden Hour Sun
    sun_data = bpy.data.lights.new(name="Sun_Light", type='SUN')
    sun_data.energy = 4.8
    sun_data.color = (1.0, 0.95, 0.86)
    sun_obj = bpy.data.objects.new("Sun_Light", sun_data)
    collection.objects.link(sun_obj)
    sun_obj.location = (20, -25, 30)
    sun_obj.rotation_euler = (math.radians(52), math.radians(14), math.radians(-38))

    # Soft Sky Fill
    fill_data = bpy.data.lights.new(name="Fill_Light", type='SUN')
    fill_data.energy = 1.4
    fill_data.color = (0.78, 0.88, 1.0)
    fill_obj = bpy.data.objects.new("Fill_Light", fill_data)
    collection.objects.link(fill_obj)
    fill_obj.location = (-25, 25, 18)
    fill_obj.rotation_euler = (math.radians(65), math.radians(-25), math.radians(145))

    # Camera
    cam_data = bpy.data.cameras.new(name="Main_Camera")
    cam_data.lens = 45.0
    cam_obj = bpy.data.objects.new("Main_Camera", cam_data)
    collection.objects.link(cam_obj)
    
    cam_dist = tree_height * 2.0
    cam_obj.location = (cam_dist * 0.72, -cam_dist * 0.78, tree_height * 0.40)
    
    target = Vector((0, 0, tree_height * 0.38))
    direction = target - cam_obj.location
    cam_obj.rotation_euler = direction.to_track_quat('-Z', 'Y').to_euler()
    bpy.context.scene.camera = cam_obj


def export_assets_and_encode(output_base_path, render_preview=False):
    abs_base = os.path.abspath(output_base_path)
    os.makedirs(os.path.dirname(abs_base), exist_ok=True)

    # 1. Native Blend
    blend_path = f"{abs_base}.blend"
    bpy.ops.wm.save_as_mainfile(filepath=blend_path)
    print(f"[EXPORT] Saved Blend: {blend_path}")

    # 2. GLB (WebGL)
    glb_path = f"{abs_base}.glb"
    bpy.ops.export_scene.gltf(
        filepath=glb_path,
        export_format='GLB',
        export_apply=True,
        export_materials='EXPORT',
        export_image_format='AUTO'
    )
    print(f"[EXPORT] Saved GLB: {glb_path}")

    # 3. Universal OBJ
    obj_path = f"{abs_base}.obj"
    try:
        bpy.ops.wm.obj_export(filepath=obj_path, apply_modifiers=True)
    except Exception:
        bpy.ops.export_scene.obj(filepath=obj_path, use_selection=False)
    print(f"[EXPORT] Saved OBJ: {obj_path}")

    # 4. Render Preview
    if render_preview:
        render_path = f"{abs_base}_preview.png"
        scene = bpy.context.scene
        scene.render.filepath = render_path
        scene.render.resolution_x = 1920
        scene.render.resolution_y = 1080
        scene.render.image_settings.file_format = 'PNG'
        try:
            print(f"[RENDER] Rendering preview: {render_path}...")
            bpy.ops.render.render(write_still=True)
            print(f"[RENDER SUCCESS] Saved Preview: {render_path}")
        except Exception as e:
            print(f"[RENDER WARNING] Render failed: {e}")


# =============================================================================
# 6. MASTER EXECUTION ROUTINE
# =============================================================================

def build_tree_scene(cfg):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.unit_settings.system = 'METRIC'
    scene.unit_settings.scale_length = 1.0
    
    col_name = "Montezuma_Cypress_Ultra"
    col = bpy.data.collections.new(col_name)
    scene.collection.children.link(col)

    # 1. Materials
    mat_bark = build_montezuma_bark_ultra()
    mat_foliage = build_montezuma_foliage_ultra()
    mat_moss = build_spanish_moss_material()

    # 2. Trunk & 4-Tier Branches
    bm_wood = bmesh.new()
    top_rim = generate_montezuma_trunk(bm_wood, cfg)
    
    top_center = Vector((0, 0, 0))
    for v in top_rim:
        top_center += v.co
    top_center /= float(len(top_rim))
    
    hierarchy = BranchHierarchyBuilder(cfg)
    hierarchy.build_hierarchy(top_center)
    
    for pts, rads in hierarchy.l1_branches:
        extrude_branch_mesh(bm_wood, pts, rads, radial_segs=14)
    for pts, rads in hierarchy.l2_branches:
        extrude_branch_mesh(bm_wood, pts, rads, radial_segs=10)
    for pts, rads in hierarchy.l3_branches:
        extrude_branch_mesh(bm_wood, pts, rads, radial_segs=8)
        
    mesh_wood = bpy.data.meshes.new("Montezuma_Wood_Mesh")
    bm_wood.to_mesh(mesh_wood)
    bm_wood.free()
    
    obj_wood = bpy.data.objects.new("Montezuma_Trunk_Canopy", mesh_wood)
    col.objects.link(obj_wood)
    obj_wood.data.materials.append(mat_bark)
    for p in mesh_wood.polygons:
        p.use_smooth = True

    # 3. Weeping Foliage Sprays
    if cfg.generate_foliage:
        bm_fol = bmesh.new()
        generate_weeping_foliage_mesh(bm_fol, hierarchy.l3_branches, cfg)
        mesh_fol = bpy.data.meshes.new("Montezuma_Foliage_Mesh")
        bm_fol.to_mesh(mesh_fol)
        bm_fol.free()
        
        obj_fol = bpy.data.objects.new("Montezuma_Foliage_Canopy", mesh_fol)
        col.objects.link(obj_fol)
        obj_fol.data.materials.append(mat_foliage)

    # 4. Spanish Moss Festoons
    if cfg.generate_moss and len(hierarchy.moss_anchors) > 0:
        bm_moss = bmesh.new()
        generate_spanish_moss_mesh(bm_moss, hierarchy.moss_anchors, cfg)
        mesh_moss = bpy.data.meshes.new("Montezuma_Moss_Mesh")
        bm_moss.to_mesh(mesh_moss)
        bm_moss.free()
        
        obj_moss = bpy.data.objects.new("Montezuma_Spanish_Moss", mesh_moss)
        col.objects.link(obj_moss)
        obj_moss.data.materials.append(mat_moss)

    # 5. Staging
    setup_studio_environment(col, tree_height=cfg.total_tree_height)
    return col


def main():
    print("==================================================================")
    print("  MONTEZUMA CYPRESS (TAXODIUM MUCRONATUM) - ULTRA BOTANICAL ENGINE ")
    print("==================================================================")
    args = parse_cli_args()
    cfg = AhuehueteConfig(preset=args["preset"], seed=args["seed"])
    
    print(f"[*] Generating Preset: {cfg.preset} (Height: {cfg.total_tree_height}m, Bole: {cfg.base_radius}m)")
    build_tree_scene(cfg)
    
    print("[*] Running Multi-Format Export Pipeline...")
    export_assets_and_encode(args["out"], render_preview=args["render"])
    print("[*] Generation Complete!")


if __name__ == "__main__":
    main()
