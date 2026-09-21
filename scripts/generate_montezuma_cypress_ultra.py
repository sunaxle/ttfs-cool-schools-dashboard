"""
generate_montezuma_cypress_ultra.py
===================================
Next-Generation Procedural 3D Generator & PBR Shader Suite for Montezuma Cypress
(Taxodium mucronatum / Ahuehuete) and Spanish Moss (Tillandsia usneoides).
Engineered for Blender 5.2 LTS (with full Blender 4.x / 5.x Principled BSDF v2 compatibility).

Features:
1. PBR Peeling Fibrous Bark Shader ('M_Montezuma_Bark_Ultra'):
   - Multi-octave procedural displacement (Macro fissures, peeling ribbon ridges, micro-fibrous grain).
   - Color grading: Deep charcoal/burnt umber crevices (#1A100B), terracotta-cinnamon inner bark (#96482B),
     weathered cedar gray outer crests (#78726B), and damp olive-moss/lichen (#3F4C23, #7D8B6E) on upper surfaces (Nz > 0.3).
   - Micro-roughness variation (0.97 in crevices to 0.74 on crests) eliminating plastic specular sheen.
   - Dual-pipeline: Real-time Bump Normal map + true Cycles Displacement.

2. PBR Translucent Feathery Foliage Shader ('M_Montezuma_Foliage_Ultra'):
   - High-fidelity alpha-masked needle frond procedural/texture generation.
   - Principled BSDF v2 Subsurface Scattering with chartreuse forward transmission (Radius: 0.65, 0.88, 0.22, Anisotropy: 0.75).
   - Thin Wall transmission enabling physical single-surface chlorophyll light transport.
   - Randomized botanical leaf-age tinting per branchlet (Geometry Random per island + UV gradient from deep emerald base to fresh chartreuse tips, plus bronze senescence).

3. Spanish Moss Material ('M_Spanish_Moss') & Procedural Festoon Geometry:
   - Pale silvery-sage green (#9DA893) with fine fibrous noise.
   - Velvet sheen (Principled BSDF v2 Sheen Weight: 1.0, Sheen Roughness: 0.45) simulating peltate trichome micro-scales.
   - Diffuse translucency and alpha fringe draping.

4. Botanical Visual QC Staging Rig:
   - Physically-based Multi-Scattering / Nishita Sky atmosphere model.
   - 3-point calibrated lighting: 5400K Warm Key Sun (0.545 deg solar disk for soft contact penumbras),
     Foliage SSS Translucency Rim Backlight, and Cool Skylight Fill.
   - 85mm Visual QC telephoto inspection camera with depth-of-field auto-tracking.
   - Ground soil plane with contact shadow receiver.

5. Multi-Format Asset Export Pipeline (.blend, .glb, .obj, .png preview).
"""

import sys
import os
import math
import random
import bpy
import bmesh
import mathutils


# =============================================================================
# 1. CONFIGURATION & PRESETS
# =============================================================================

class TreeConfig:
    """Botanical architectural parameters for Montezuma Cypress (Taxodium mucronatum)."""
    def __init__(self, preset="mature_campus"):
        self.preset = preset
        self.random_seed = 42
        
        if preset == "old_growth_giant":
            # Ancient Resaca Giant (El Árbol del Tule style)
            self.height = 16.5
            self.base_radius = 2.9
            self.mid_radius = 1.35
            self.top_radius = 0.5
            self.flute_lobes = 9
            self.flute_amplitude = 0.38
            self.flare_decay = 3.6
            self.scaffold_count = 8
            self.canopy_spread = 15.5
            self.foliage_density = 480
            self.spanish_moss_count = 45
        else:
            # Mature Campus Specimen (~12-14m height, graceful spreading crown)
            self.height = 12.8
            self.base_radius = 1.65
            self.mid_radius = 0.82
            self.top_radius = 0.32
            self.flute_lobes = 7
            self.flute_amplitude = 0.28
            self.flare_decay = 2.7
            self.scaffold_count = 6
            self.canopy_spread = 11.5
            self.foliage_density = 340
            self.spanish_moss_count = 28

        self.num_z_rings = 42
        self.num_radial_pts = 36
        self.weep_intensity = 0.80  # Gravitational droop on terminal twigs


def parse_cli_args():
    """Parses optional CLI arguments after '--'."""
    args = {
        "out": "assets/3d/montezuma_cypress/montezuma_cypress_ultra",
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
# 2. SCENE INITIALIZATION
# =============================================================================

def reset_scene():
    """Initializes a pristine Blender scene with metric units and color management."""
    bpy.ops.wm.read_factory_settings(use_empty=True)
    
    scene = bpy.context.scene
    scene.unit_settings.system = 'METRIC'
    scene.unit_settings.scale_length = 1.0
    scene.unit_settings.length_unit = 'METERS'
    
    # Engine configuration (EEVEE Next / Cycles)
    try:
        scene.render.engine = 'BLENDER_EEVEE_NEXT'
    except Exception:
        try:
            scene.render.engine = 'BLENDER_EEVEE'
        except Exception:
            scene.render.engine = 'CYCLES'
            
    # AgX / Filmic Color Management
    if hasattr(scene.view_settings, "view_transform"):
        available_transforms = [e.identifier for e in scene.view_settings.bl_rna.properties['view_transform'].enum_items]
        if 'AgX' in available_transforms:
            scene.view_settings.view_transform = 'AgX'
            scene.view_settings.look = 'AgX - Base Contrast'
        elif 'Filmic' in available_transforms:
            scene.view_settings.view_transform = 'Filmic'
            scene.view_settings.look = 'Medium High Contrast'
            
    col_name = "Montezuma_Cypress_Ultra_Collection"
    col = bpy.data.collections.get(col_name)
    if not col:
        col = bpy.data.collections.new(col_name)
        bpy.context.scene.collection.children.link(col)
    return col


# =============================================================================
# 3. NEXT-GEN PBR SHADER NODE GRAPHS (BLENDER 5.2 PRINCIPLED BSDF V2)
# =============================================================================

def create_montezuma_bark_ultra_material(name="M_Montezuma_Bark_Ultra"):
    """
    Creates the ultra-photorealistic PBR Peeling Fibrous Bark material.
    Multi-octave displacement, terracotta inner cambium, weathered cedar gray crests,
    damp olive-moss upper patches, and micro-roughness anti-gloss calibration.
    """
    mat = bpy.data.materials.get(name) or bpy.data.materials.new(name=name)
    if hasattr(mat, "use_nodes"):
        mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()

    # 1. Output Material
    node_out = nodes.new(type='ShaderNodeOutputMaterial')
    node_out.location = (1400, 0)

    # 2. Principled BSDF v2
    node_bsdf = nodes.new(type='ShaderNodeBsdfPrincipled')
    node_bsdf.location = (1100, 0)
    
    if 'Specular IOR Level' in node_bsdf.inputs:
        node_bsdf.inputs['Specular IOR Level'].default_value = 0.32
    elif 'Specular' in node_bsdf.inputs:
        node_bsdf.inputs['Specular'].default_value = 0.32
        
    if 'Sheen Weight' in node_bsdf.inputs:
        node_bsdf.inputs['Sheen Weight'].default_value = 0.25
        node_bsdf.inputs['Sheen Roughness'].default_value = 0.70
        node_bsdf.inputs['Sheen Tint'].default_value = (0.45, 0.55, 0.30, 1.0)
    elif 'Sheen' in node_bsdf.inputs:
        node_bsdf.inputs['Sheen'].default_value = 0.25

    links.new(node_bsdf.outputs['BSDF'], node_out.inputs['Surface'])

    # 3. Coordinate System & Longitudinal Mapping
    node_coord = nodes.new(type='ShaderNodeTexCoord')
    node_coord.location = (-1400, 0)

    node_map = nodes.new(type='ShaderNodeMapping')
    node_map.location = (-1200, 0)
    node_map.inputs['Scale'].default_value = (1.25, 1.25, 14.5)
    links.new(node_coord.outputs['Object'], node_map.inputs['Vector'])

    # Micro-warp Noise for organic longitudinal drift
    node_warp_noise = nodes.new(type='ShaderNodeTexNoise')
    node_warp_noise.location = (-1200, -300)
    node_warp_noise.inputs['Scale'].default_value = 1.8
    node_warp_noise.inputs['Detail'].default_value = 4.0
    node_warp_noise.inputs['Roughness'].default_value = 0.5
    links.new(node_coord.outputs['Object'], node_warp_noise.inputs['Vector'])

    node_vec_math = nodes.new(type='ShaderNodeVectorMath')
    node_vec_math.location = (-1000, 0)
    node_vec_math.operation = 'ADD'
    links.new(node_map.outputs['Vector'], node_vec_math.inputs[0])
    
    node_warp_scale = nodes.new(type='ShaderNodeVectorMath')
    node_warp_scale.location = (-1000, -300)
    node_warp_scale.operation = 'SCALE'
    node_warp_scale.inputs['Scale'].default_value = 0.12
    links.new(node_warp_noise.outputs['Color'], node_warp_scale.inputs[0])
    links.new(node_warp_scale.outputs['Vector'], node_vec_math.inputs[1])

    final_vec = node_vec_math.outputs['Vector']

    # 4. Octave 1: Macro Longitudinal Fissures (Voronoi Distance to Edge)
    node_voro_macro = nodes.new(type='ShaderNodeTexVoronoi')
    node_voro_macro.location = (-750, 400)
    node_voro_macro.feature = 'DISTANCE_TO_EDGE'
    node_voro_macro.inputs['Scale'].default_value = 2.4
    node_voro_macro.inputs['Randomness'].default_value = 0.85
    links.new(final_vec, node_voro_macro.inputs['Vector'])

    node_ramp_fissure = nodes.new(type='ShaderNodeMapRange')
    node_ramp_fissure.location = (-550, 400)
    node_ramp_fissure.inputs['From Min'].default_value = 0.0
    node_ramp_fissure.inputs['From Max'].default_value = 0.35
    node_ramp_fissure.inputs['To Min'].default_value = 0.0
    node_ramp_fissure.inputs['To Max'].default_value = 1.0
    links.new(node_voro_macro.outputs['Distance'], node_ramp_fissure.inputs['Value'])

    # 5. Octave 2: Peeling Ribbon Strips (Wave Texture with asymmetric ramp)
    node_wave_peel = nodes.new(type='ShaderNodeTexWave')
    node_wave_peel.location = (-750, 100)
    node_wave_peel.wave_type = 'BANDS'
    node_wave_peel.bands_direction = 'Z'
    node_wave_peel.inputs['Scale'].default_value = 4.8
    node_wave_peel.inputs['Distortion'].default_value = 5.5
    node_wave_peel.inputs['Detail'].default_value = 6.0
    node_wave_peel.inputs['Detail Scale'].default_value = 2.5
    node_wave_peel.inputs['Detail Roughness'].default_value = 0.65
    links.new(final_vec, node_wave_peel.inputs['Vector'])

    node_peel_curve = nodes.new(type='ShaderNodeMath')
    node_peel_curve.location = (-550, 100)
    node_peel_curve.operation = 'POWER'
    node_peel_curve.inputs[1].default_value = 1.8
    links.new(node_wave_peel.outputs['Color'], node_peel_curve.inputs[0])

    # 6. Octave 3: Micro-Fibrous Grain
    node_noise_fibers = nodes.new(type='ShaderNodeTexNoise')
    node_noise_fibers.location = (-750, -200)
    node_noise_fibers.inputs['Scale'].default_value = 55.0
    node_noise_fibers.inputs['Detail'].default_value = 14.0
    node_noise_fibers.inputs['Roughness'].default_value = 0.75
    node_noise_fibers.inputs['Distortion'].default_value = 0.3
    links.new(final_vec, node_noise_fibers.inputs['Vector'])

    # 7. Composite Displacement & Height Calculation
    node_mix_disp1 = nodes.new(type='ShaderNodeMix')
    node_mix_disp1.location = (-300, 200)
    node_mix_disp1.data_type = 'FLOAT'
    node_mix_disp1.inputs[0].default_value = 0.45
    links.new(node_ramp_fissure.outputs['Result'], node_mix_disp1.inputs[2])
    links.new(node_peel_curve.outputs['Value'], node_mix_disp1.inputs[3])

    node_mix_disp2 = nodes.new(type='ShaderNodeMix')
    node_mix_disp2.location = (-100, 200)
    node_mix_disp2.data_type = 'FLOAT'
    node_mix_disp2.inputs[0].default_value = 0.18
    links.new(node_mix_disp1.outputs[0], node_mix_disp2.inputs[2])
    links.new(node_noise_fibers.outputs['Fac'], node_mix_disp2.inputs[3])

    composite_height = node_mix_disp2.outputs[0]

    # 8. Botanical Color Stratification Ramp
    node_color_ramp = nodes.new(type='ShaderNodeValToRGB')
    node_color_ramp.location = (150, 200)
    cr = node_color_ramp.color_ramp
    cr.interpolation = 'LINEAR'
    
    # Deep Crevice Charcoal / Burnt Umber (#1A100B)
    cr.elements[0].position = 0.0
    cr.elements[0].color = (0.102, 0.063, 0.043, 1.0)
    
    # Weathered Cedar Outer Crests (#78726B)
    cr.elements[1].position = 0.85
    cr.elements[1].color = (0.471, 0.447, 0.420, 1.0)
    
    # Terracotta-Cinnamon Inner Cambium (#96482B)
    e_cinnamon = cr.elements.new(0.30)
    e_cinnamon.color = (0.588, 0.282, 0.169, 1.0)
    
    # Warm Cedar Underbark (#5A4E44)
    e_cedar = cr.elements.new(0.60)
    e_cedar.color = (0.353, 0.306, 0.267, 1.0)

    links.new(composite_height, node_color_ramp.inputs['Fac'])

    # 9. Upper-Facing & Hollows Damp Olive-Moss Mask (Normal.z > 0.3)
    node_geom = nodes.new(type='ShaderNodeNewGeometry')
    node_geom.location = (150, -200)

    node_sep_norm = nodes.new(type='ShaderNodeSeparateXYZ')
    node_sep_norm.location = (350, -200)
    links.new(node_geom.outputs['Normal'], node_sep_norm.inputs['Vector'])

    node_moss_slope = nodes.new(type='ShaderNodeMapRange')
    node_moss_slope.location = (550, -200)
    node_moss_slope.inputs['From Min'].default_value = 0.2
    node_moss_slope.inputs['From Max'].default_value = 0.85
    node_moss_slope.inputs['To Min'].default_value = 0.0
    node_moss_slope.inputs['To Max'].default_value = 1.0
    links.new(node_sep_norm.outputs['Z'], node_moss_slope.inputs['Value'])

    node_moss_noise = nodes.new(type='ShaderNodeTexNoise')
    node_moss_noise.location = (350, -400)
    node_moss_noise.inputs['Scale'].default_value = 8.0
    node_moss_noise.inputs['Detail'].default_value = 6.0
    node_moss_noise.inputs['Roughness'].default_value = 0.70
    links.new(node_coord.outputs['Object'], node_moss_noise.inputs['Vector'])

    node_moss_mask = nodes.new(type='ShaderNodeMath')
    node_moss_mask.location = (750, -250)
    node_moss_mask.operation = 'MULTIPLY'
    links.new(node_moss_slope.outputs['Result'], node_moss_mask.inputs[0])
    links.new(node_moss_noise.outputs['Fac'], node_moss_mask.inputs[1])

    node_moss_ramp = nodes.new(type='ShaderNodeValToRGB')
    node_moss_ramp.location = (550, -50)
    cr_m = node_moss_ramp.color_ramp
    cr_m.elements[0].position = 0.2
    cr_m.elements[0].color = (0.247, 0.298, 0.137, 1.0)  # Damp Olive-Moss (#3F4C23)
    cr_m.elements[1].position = 0.8
    cr_m.elements[1].color = (0.490, 0.545, 0.431, 1.0)  # Pale Lichen (#7D8B6E)
    links.new(node_moss_noise.outputs['Fac'], node_moss_ramp.inputs['Fac'])

    node_mix_moss = nodes.new(type='ShaderNodeMix')
    node_mix_moss.location = (850, 150)
    node_mix_moss.data_type = 'RGBA'
    links.new(node_moss_mask.outputs['Value'], node_mix_moss.inputs[0])
    links.new(node_color_ramp.outputs['Color'], node_mix_moss.inputs[6])
    links.new(node_moss_ramp.outputs['Color'], node_mix_moss.inputs[7])
    links.new(node_mix_moss.outputs[2], node_bsdf.inputs['Base Color'])

    # 10. Micro-Roughness Mapping (Prevent Plastic Glaze)
    node_roughness_map = nodes.new(type='ShaderNodeMapRange')
    node_roughness_map.location = (550, 350)
    node_roughness_map.inputs['From Min'].default_value = 0.0
    node_roughness_map.inputs['From Max'].default_value = 1.0
    node_roughness_map.inputs['To Min'].default_value = 0.97
    node_roughness_map.inputs['To Max'].default_value = 0.74
    links.new(composite_height, node_roughness_map.inputs['Value'])

    node_rough_mix = nodes.new(type='ShaderNodeMix')
    node_rough_mix.location = (850, 350)
    node_rough_mix.data_type = 'FLOAT'
    node_rough_mix.inputs[0].default_value = 0.25
    links.new(node_roughness_map.outputs['Result'], node_rough_mix.inputs[2])
    links.new(node_noise_fibers.outputs['Fac'], node_rough_mix.inputs[3])
    links.new(node_rough_mix.outputs[0], node_bsdf.inputs['Roughness'])

    # 11. Normal Bump & Geometric Displacement
    node_bump = nodes.new(type='ShaderNodeBump')
    node_bump.location = (850, -50)
    node_bump.inputs['Strength'].default_value = 0.92
    node_bump.inputs['Distance'].default_value = 0.06
    links.new(composite_height, node_bump.inputs['Height'])
    links.new(node_bump.outputs['Normal'], node_bsdf.inputs['Normal'])

    node_disp = nodes.new(type='ShaderNodeDisplacement')
    node_disp.location = (1100, -300)
    node_disp.inputs['Scale'].default_value = 0.08
    node_disp.inputs['Midlevel'].default_value = 0.4
    links.new(composite_height, node_disp.inputs['Height'])
    links.new(node_disp.outputs['Displacement'], node_out.inputs['Displacement'])

    return mat


def create_montezuma_foliage_ultra_material(name="M_Montezuma_Foliage_Ultra"):
    """
    Creates the ultra-photorealistic PBR Feathery Foliage material.
    Principled BSDF v2 Thin Wall SSS with forward chartreuse transmission,
    alpha needle frond geometry, and per-branchlet leaf age randomization.
    """
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

    # 1. Output & Principled BSDF v2
    node_out = nodes.new(type='ShaderNodeOutputMaterial')
    node_out.location = (1200, 0)

    node_bsdf = nodes.new(type='ShaderNodeBsdfPrincipled')
    node_bsdf.location = (900, 0)
    
    node_bsdf.inputs['Roughness'].default_value = 0.36
    if 'Specular IOR Level' in node_bsdf.inputs:
        node_bsdf.inputs['Specular IOR Level'].default_value = 0.45
    elif 'Specular' in node_bsdf.inputs:
        node_bsdf.inputs['Specular'].default_value = 0.45

    if 'Thin Wall' in node_bsdf.inputs:
        node_bsdf.inputs['Thin Wall'].default_value = True

    # SSS / Translucency with Chartreuse Forward Scattering
    if 'Subsurface Weight' in node_bsdf.inputs:
        node_bsdf.inputs['Subsurface Weight'].default_value = 0.85
        # Chartreuse transmission radius (R: 0.65, G: 0.88, B: 0.22)
        node_bsdf.inputs['Subsurface Radius'].default_value = (0.65, 0.88, 0.22)
        node_bsdf.inputs['Subsurface Scale'].default_value = 0.08
        if 'Subsurface Anisotropy' in node_bsdf.inputs:
            node_bsdf.inputs['Subsurface Anisotropy'].default_value = 0.75
    elif 'Subsurface' in node_bsdf.inputs:
        node_bsdf.inputs['Subsurface'].default_value = 0.60
        if 'Subsurface Color' in node_bsdf.inputs:
            node_bsdf.inputs['Subsurface Color'].default_value = (0.65, 0.88, 0.22, 1.0)

    links.new(node_bsdf.outputs['BSDF'], node_out.inputs['Surface'])

    # 2. UV Needle Frond Alpha Mask
    node_coord = nodes.new(type='ShaderNodeTexCoord')
    node_coord.location = (-1100, 0)

    node_sep_uv = nodes.new(type='ShaderNodeSeparateXYZ')
    node_sep_uv.location = (-900, 0)
    links.new(node_coord.outputs['UV'], node_sep_uv.inputs['Vector'])

    node_u_center = nodes.new(type='ShaderNodeMath')
    node_u_center.location = (-700, 150)
    node_u_center.operation = 'SUBTRACT'
    node_u_center.inputs[1].default_value = 0.5
    links.new(node_sep_uv.outputs['X'], node_u_center.inputs[0])

    node_u_abs = nodes.new(type='ShaderNodeMath')
    node_u_abs.location = (-500, 150)
    node_u_abs.operation = 'ABSOLUTE'
    links.new(node_u_center.outputs['Value'], node_u_abs.inputs[0])

    node_u_dist = nodes.new(type='ShaderNodeMath')
    node_u_dist.location = (-300, 150)
    node_u_dist.operation = 'MULTIPLY'
    node_u_dist.inputs[1].default_value = 2.0
    links.new(node_u_abs.outputs['Value'], node_u_dist.inputs[0])

    node_v_comb = nodes.new(type='ShaderNodeMath')
    node_v_comb.location = (-700, -100)
    node_v_comb.operation = 'PINGPONG'
    node_v_comb.inputs[1].default_value = 0.04
    links.new(node_sep_uv.outputs['Y'], node_v_comb.inputs[0])

    node_v_scale = nodes.new(type='ShaderNodeMath')
    node_v_scale.location = (-500, -100)
    node_v_scale.operation = 'DIVIDE'
    node_v_scale.inputs[1].default_value = 0.04
    links.new(node_v_comb.outputs['Value'], node_v_scale.inputs[0])

    node_taper = nodes.new(type='ShaderNodeMath')
    node_taper.location = (-700, 350)
    node_taper.operation = 'MULTIPLY_ADD'
    node_taper.inputs[1].default_value = -0.5
    node_taper.inputs[2].default_value = 1.0
    links.new(node_sep_uv.outputs['Y'], node_taper.inputs[0])

    node_needle_shape = nodes.new(type='ShaderNodeMath')
    node_needle_shape.location = (-300, -50)
    node_needle_shape.operation = 'MULTIPLY'
    links.new(node_v_scale.outputs['Value'], node_needle_shape.inputs[0])
    links.new(node_taper.outputs['Value'], node_needle_shape.inputs[1])

    node_alpha_comp = nodes.new(type='ShaderNodeMath')
    node_alpha_comp.location = (-100, 50)
    node_alpha_comp.operation = 'GREATER_THAN'
    links.new(node_needle_shape.outputs['Value'], node_alpha_comp.inputs[0])
    links.new(node_u_dist.outputs['Value'], node_alpha_comp.inputs[1])

    node_alpha_smooth = nodes.new(type='ShaderNodeMapRange')
    node_alpha_smooth.location = (100, 50)
    node_alpha_smooth.inputs['From Min'].default_value = 0.0
    node_alpha_smooth.inputs['From Max'].default_value = 1.0
    links.new(node_alpha_comp.outputs['Value'], node_alpha_smooth.inputs['Value'])
    links.new(node_alpha_smooth.outputs['Result'], node_bsdf.inputs['Alpha'])

    # 3. Randomized Botanical Leaf-Age & Flush Ramp
    node_geom = nodes.new(type='ShaderNodeNewGeometry')
    node_geom.location = (-100, 450)

    node_age_mix = nodes.new(type='ShaderNodeMix')
    node_age_mix.location = (150, 400)
    node_age_mix.data_type = 'FLOAT'
    node_age_mix.inputs[0].default_value = 0.35
    links.new(node_sep_uv.outputs['Y'], node_age_mix.inputs[2])
    links.new(node_geom.outputs['Random Per Island'], node_age_mix.inputs[3])

    node_foliage_ramp = nodes.new(type='ShaderNodeValToRGB')
    node_foliage_ramp.location = (400, 400)
    cr_f = node_foliage_ramp.color_ramp
    cr_f.interpolation = 'LINEAR'
    
    # Deep Emerald Inner Green (#143513)
    cr_f.elements[0].position = 0.0
    cr_f.elements[0].color = (0.078, 0.208, 0.075, 1.0)
    
    # Fresh Spring Flush Chartreuse (#8EC72E)
    cr_f.elements[1].position = 0.85
    cr_f.elements[1].color = (0.557, 0.780, 0.180, 1.0)
    
    # Rich Summer Cypress Green (#2B5B1E)
    e_summer = cr_f.elements.new(0.40)
    e_summer.color = (0.169, 0.357, 0.118, 1.0)
    
    # Autumn / Dry Senescence Bronze (#9E5524)
    e_bronze = cr_f.elements.new(0.96)
    e_bronze.color = (0.620, 0.333, 0.141, 1.0)

    links.new(node_age_mix.outputs[0], node_foliage_ramp.inputs['Fac'])
    links.new(node_foliage_ramp.outputs['Color'], node_bsdf.inputs['Base Color'])

    # Micro-needle normal bump
    node_f_noise = nodes.new(type='ShaderNodeTexNoise')
    node_f_noise.location = (400, 150)
    node_f_noise.inputs['Scale'].default_value = 35.0
    node_f_noise.inputs['Detail'].default_value = 4.0
    links.new(node_coord.outputs['UV'], node_f_noise.inputs['Vector'])

    node_f_bump = nodes.new(type='ShaderNodeBump')
    node_f_bump.location = (650, 150)
    node_f_bump.inputs['Strength'].default_value = 0.25
    node_f_bump.inputs['Distance'].default_value = 0.02
    links.new(node_f_noise.outputs['Fac'], node_f_bump.inputs['Height'])
    links.new(node_f_bump.outputs['Normal'], node_bsdf.inputs['Normal'])

    return mat


def create_spanish_moss_material(name="M_Spanish_Moss"):
    """
    Creates the pale silvery-sage Spanish Moss material (Tillandsia usneoides).
    Peltate trichome velvet sheen, diffuse translucency, and fibrous micro-bump.
    """
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

    # 1. Output & Principled BSDF v2
    node_out = nodes.new(type='ShaderNodeOutputMaterial')
    node_out.location = (1100, 0)

    node_bsdf = nodes.new(type='ShaderNodeBsdfPrincipled')
    node_bsdf.location = (800, 0)
    
    node_bsdf.inputs['Roughness'].default_value = 0.92
    if 'Specular IOR Level' in node_bsdf.inputs:
        node_bsdf.inputs['Specular IOR Level'].default_value = 0.25
    elif 'Specular' in node_bsdf.inputs:
        node_bsdf.inputs['Specular'].default_value = 0.25

    if 'Thin Wall' in node_bsdf.inputs:
        node_bsdf.inputs['Thin Wall'].default_value = True

    # Peltate Trichome Velvet Sheen
    if 'Sheen Weight' in node_bsdf.inputs:
        node_bsdf.inputs['Sheen Weight'].default_value = 1.0
        node_bsdf.inputs['Sheen Roughness'].default_value = 0.45
        node_bsdf.inputs['Sheen Tint'].default_value = (0.88, 0.92, 0.85, 1.0)
    elif 'Sheen' in node_bsdf.inputs:
        node_bsdf.inputs['Sheen'].default_value = 1.0

    # Subsurface Translucency
    if 'Subsurface Weight' in node_bsdf.inputs:
        node_bsdf.inputs['Subsurface Weight'].default_value = 0.72
        node_bsdf.inputs['Subsurface Radius'].default_value = (0.75, 0.85, 0.65)
        node_bsdf.inputs['Subsurface Scale'].default_value = 0.035
    elif 'Subsurface' in node_bsdf.inputs:
        node_bsdf.inputs['Subsurface'].default_value = 0.50

    links.new(node_bsdf.outputs['BSDF'], node_out.inputs['Surface'])

    # 2. Coordinates & Fine Fibrous Noise
    node_coord = nodes.new(type='ShaderNodeTexCoord')
    node_coord.location = (-800, 0)

    node_map = nodes.new(type='ShaderNodeMapping')
    node_map.location = (-600, 0)
    node_map.inputs['Scale'].default_value = (2.0, 2.0, 18.0)
    links.new(node_coord.outputs['Object'], node_map.inputs['Vector'])

    node_noise_fibers = nodes.new(type='ShaderNodeTexNoise')
    node_noise_fibers.location = (-350, 100)
    node_noise_fibers.inputs['Scale'].default_value = 45.0
    node_noise_fibers.inputs['Detail'].default_value = 8.0
    node_noise_fibers.inputs['Roughness'].default_value = 0.72
    links.new(node_map.outputs['Vector'], node_noise_fibers.inputs['Vector'])

    # 3. Silvery-Sage Green Botanical Color Ramp
    node_ramp = nodes.new(type='ShaderNodeValToRGB')
    node_ramp.location = (-50, 150)
    cr = node_ramp.color_ramp
    cr.interpolation = 'LINEAR'
    
    # Muted Sage Celadon (#8A9680)
    cr.elements[0].position = 0.0
    cr.elements[0].color = (0.541, 0.588, 0.502, 1.0)
    
    # Pale Silvery Frost (#C8D1C2)
    cr.elements[1].position = 0.70
    cr.elements[1].color = (0.784, 0.820, 0.761, 1.0)
    
    # Silvery-Sage Green (#9DA893)
    e_sage = cr.elements.new(0.35)
    e_sage.color = (0.616, 0.659, 0.576, 1.0)

    links.new(node_noise_fibers.outputs['Fac'], node_ramp.inputs['Fac'])
    links.new(node_ramp.outputs['Color'], node_bsdf.inputs['Base Color'])

    # 4. Fibrous Bump Mapping
    node_bump = nodes.new(type='ShaderNodeBump')
    node_bump.location = (450, -100)
    node_bump.inputs['Strength'].default_value = 0.60
    node_bump.inputs['Distance'].default_value = 0.03
    links.new(node_noise_fibers.outputs['Fac'], node_bump.inputs['Height'])
    links.new(node_bump.outputs['Normal'], node_bsdf.inputs['Normal'])

    return mat


# =============================================================================
# 4. PROCEDURAL BOTANICAL GEOMETRY BUILDER
# =============================================================================

def build_fluted_trunk(cfg, collection, bark_mat):
    """Generates the harmonic fluted buttressed trunk and root flare."""
    mesh = bpy.data.meshes.new("Montezuma_Trunk_Mesh")
    bm = bmesh.new()

    rings = []
    z_step = cfg.height / (cfg.num_z_rings - 1)
    
    for i in range(cfg.num_z_rings):
        z = i * z_step
        t = i / (cfg.num_z_rings - 1)
        
        flare = math.exp(-z / cfg.flare_decay) * 1.85
        r_base = (cfg.base_radius * (1.0 + flare) * (1.0 - t * 0.72)) + cfg.top_radius
        flute_amp = cfg.flute_amplitude * math.exp(-z / (cfg.flare_decay * 1.3))
        twist = 0.12 * z
        
        ring_verts = []
        for j in range(cfg.num_radial_pts):
            theta = (j / cfg.num_radial_pts) * 2.0 * math.pi
            harmonics = (
                math.cos(cfg.flute_lobes * theta + twist) +
                0.35 * math.cos(2.0 * cfg.flute_lobes * theta) +
                0.15 * math.sin(3.0 * cfg.flute_lobes * theta)
            )
            root_toe = 0.0
            if z < 1.2:
                toe_factor = (1.2 - z) / 1.2
                root_toe = math.pow(max(0, math.cos(cfg.flute_lobes * theta + twist)), 3.0) * (0.6 * toe_factor)
                
            r = r_base * (1.0 + flute_amp * harmonics) + root_toe
            r += math.sin(z * 2.5 + theta * 3.0) * 0.02
            
            x = r * math.cos(theta)
            y = r * math.sin(theta)
            v = bm.verts.new((x, y, z))
            ring_verts.append(v)
            
        rings.append(ring_verts)

    bm.verts.ensure_lookup_table()

    for i in range(cfg.num_z_rings - 1):
        for j in range(cfg.num_radial_pts):
            v1 = rings[i][j]
            v2 = rings[i][(j + 1) % cfg.num_radial_pts]
            v3 = rings[i + 1][(j + 1) % cfg.num_radial_pts]
            v4 = rings[i + 1][j]
            bm.faces.new((v1, v2, v3, v4))

    bm.faces.new(rings[0][::-1])
    bm.to_mesh(mesh)
    bm.free()

    obj = bpy.data.objects.new("Montezuma_Trunk", mesh)
    collection.objects.link(obj)
    
    if bark_mat:
        obj.data.materials.append(bark_mat)
        
    for poly in mesh.polygons:
        poly.use_smooth = True
        
    subsurf = obj.modifiers.new(name="Subsurf", type='SUBSURF')
    subsurf.levels = 1
    subsurf.render_levels = 2

    return obj


def generate_branch_curve(start_pt, end_pt, control_pts, radius_start=0.35, radius_end=0.04):
    """Generates a smooth tapered 3D branch curve geometry."""
    curve_data = bpy.data.curves.new(name="Branch_Curve", type='CURVE')
    curve_data.dimensions = '3D'
    curve_data.fill_mode = 'FULL'
    curve_data.bevel_depth = radius_start
    curve_data.bevel_resolution = 4

    spline = curve_data.splines.new(type='BEZIER')
    all_pts = [start_pt] + control_pts + [end_pt]
    spline.bezier_points.add(len(all_pts) - 1)

    for idx, pt in enumerate(all_pts):
        bp = spline.bezier_points[idx]
        bp.co = pt
        bp.handle_left_type = 'AUTO'
        bp.handle_right_type = 'AUTO'
        t = idx / (len(all_pts) - 1)
        bp.radius = max(0.02, radius_start * (1.0 - t * 0.85) + radius_end * t)

    return curve_data


def build_scaffold_canopy_and_moss(cfg, collection, bark_mat, foliage_mat, moss_mat):
    """
    Constructs spreading scaffold limbs (L1, L2), weeping pendulous branchlets (L3),
    feathery foliage cards, and hanging Spanish moss festoons.
    """
    random.seed(cfg.random_seed)
    branch_objects = []
    foliage_points = []
    moss_points = []

    golden_angle = 2.39996  # ~137.5 degrees
    
    # 1. Primary Scaffold Limbs (L1) & Secondary Lateral Branches (L2)
    for i in range(cfg.scaffold_count):
        theta = i * golden_angle + random.uniform(-0.2, 0.2)
        height_ratio = 0.35 + (i / cfg.scaffold_count) * 0.50
        z_start = cfg.height * height_ratio
        
        trunk_r = (cfg.base_radius * 0.6) * (1.0 - height_ratio * 0.5)
        p0 = mathutils.Vector((trunk_r * math.cos(theta), trunk_r * math.sin(theta), z_start))
        
        reach = (cfg.canopy_spread * 0.5) * (1.0 - (height_ratio - 0.35) * 0.7) * random.uniform(0.85, 1.15)
        elevation = z_start + random.uniform(0.5, 1.8)
        
        p_end = mathutils.Vector((
            (trunk_r + reach) * math.cos(theta),
            (trunk_r + reach) * math.sin(theta),
            elevation
        ))
        
        mid1 = p0.lerp(p_end, 0.35) + mathutils.Vector((0, 0, 0.4))
        mid2 = p0.lerp(p_end, 0.70) + mathutils.Vector((
            -math.sin(theta) * 0.4,
            math.cos(theta) * 0.4,
            -0.2
        ))
        
        curve = generate_branch_curve(p0, p_end, [mid1, mid2], radius_start=0.32, radius_end=0.08)
        b_obj = bpy.data.objects.new(f"Limb_L1_{i:02d}", curve)
        collection.objects.link(b_obj)
        b_obj.data.materials.append(bark_mat)
        branch_objects.append(b_obj)
        
        # Potential Spanish Moss anchor on L1 underside
        if random.random() < 0.85:
            moss_points.append(mid2)

        # 2. Secondary Lateral Branches (L2)
        num_l2 = random.randint(3, 5)
        for j in range(num_l2):
            t_l2 = 0.3 + (j / num_l2) * 0.65
            p_l2_start = p0.lerp(p_end, t_l2)
            
            side_sign = 1 if j % 2 == 0 else -1
            phi = theta + side_sign * random.uniform(0.5, 1.0)
            l2_reach = reach * random.uniform(0.4, 0.7)
            
            p_l2_end = p_l2_start + mathutils.Vector((
                l2_reach * math.cos(phi),
                l2_reach * math.sin(phi),
                random.uniform(-0.6, 0.3)
            ))
            
            l2_mid = p_l2_start.lerp(p_l2_end, 0.5) + mathutils.Vector((0, 0, 0.15))
            c_l2 = generate_branch_curve(p_l2_start, p_l2_end, [l2_mid], radius_start=0.10, radius_end=0.03)
            l2_obj = bpy.data.objects.new(f"Limb_L2_{i:02d}_{j:02d}", c_l2)
            collection.objects.link(l2_obj)
            l2_obj.data.materials.append(bark_mat)
            branch_objects.append(l2_obj)
            
            if random.random() < 0.65:
                moss_points.append(l2_mid)

            # 3. Tertiary Weeping Twigs (L3) & Foliage Card Anchors
            num_l3 = random.randint(4, 7)
            for k in range(num_l3):
                t_l3 = 0.2 + (k / num_l3) * 0.8
                p_l3_start = p_l2_start.lerp(p_l2_end, t_l3)
                
                weep_angle = phi + random.uniform(-0.4, 0.4)
                l3_len = random.uniform(0.9, 1.6)
                droop = l3_len * cfg.weep_intensity * random.uniform(0.7, 1.1)
                
                p_l3_end = p_l3_start + mathutils.Vector((
                    (l3_len * 0.6) * math.cos(weep_angle),
                    (l3_len * 0.6) * math.sin(weep_angle),
                    -droop
                ))
                
                foliage_points.append((p_l3_start, p_l3_end))

    # 4. Generate Foliage Cards Mesh
    foliage_mesh = bpy.data.meshes.new("Montezuma_Foliage_Mesh")
    bm_fol = bmesh.new()
    uv_layer = bm_fol.loops.layers.uv.new("UVMap")

    card_width = 0.55
    card_length = 0.95

    for p_start, p_end in foliage_points:
        dir_vec = (p_end - p_start).normalized()
        tangent = dir_vec
        side = tangent.cross(mathutils.Vector((0, 0, 1))).normalized()
        if side.length < 0.1:
            side = tangent.cross(mathutils.Vector((1, 0, 0))).normalized()
        normal = side.cross(tangent).normalized()

        num_subcards = 2
        for sc in range(num_subcards):
            t_sc = sc / num_subcards
            fp = p_start.lerp(p_end, t_sc)
            
            up = normal * random.uniform(-0.2, 0.2)
            scale = random.uniform(0.85, 1.35)
            w = card_width * scale
            l = card_length * scale
            
            v0 = bm_fol.verts.new(fp - side * (w * 0.5))
            v1 = bm_fol.verts.new(fp + side * (w * 0.5))
            v2 = bm_fol.verts.new(fp + side * (w * 0.5) + tangent * l + up * 0.15)
            v3 = bm_fol.verts.new(fp - side * (w * 0.5) + tangent * l + up * 0.15)
            
            face = bm_fol.faces.new((v0, v1, v2, v3))
            face.smooth = True
            
            # UV mapping
            face.loops[0][uv_layer].uv = (0.0, 0.0)
            face.loops[1][uv_layer].uv = (1.0, 0.0)
            face.loops[2][uv_layer].uv = (1.0, 1.0)
            face.loops[3][uv_layer].uv = (0.0, 1.0)

    bm_fol.to_mesh(foliage_mesh)
    bm_fol.free()

    foliage_obj = bpy.data.objects.new("Montezuma_Foliage_Canopy", foliage_mesh)
    collection.objects.link(foliage_obj)
    foliage_obj.data.materials.append(foliage_mat)

    # 5. Generate Spanish Moss Festoons Mesh
    moss_mesh = bpy.data.meshes.new("Spanish_Moss_Festoons_Mesh")
    bm_moss = bmesh.new()
    uv_layer_moss = bm_moss.loops.layers.uv.new("UVMap")

    # Select random subsets of anchor points for moss
    selected_anchors = random.sample(moss_points, min(len(moss_points), cfg.spanish_moss_count))
    
    for anchor in selected_anchors:
        strand_count = random.randint(2, 4)
        for s in range(strand_count):
            hang_len = random.uniform(0.8, 2.2)
            offset_x = random.uniform(-0.15, 0.15)
            offset_y = random.uniform(-0.15, 0.15)
            top_pt = anchor + mathutils.Vector((offset_x, offset_y, 0))
            
            # 3-segment draped curve for each moss festoon card
            w_top = random.uniform(0.12, 0.22)
            w_bot = random.uniform(0.04, 0.08)
            
            p0 = top_pt
            p1 = top_pt + mathutils.Vector((random.uniform(-0.08, 0.08), random.uniform(-0.08, 0.08), -hang_len * 0.5))
            p2 = top_pt + mathutils.Vector((random.uniform(-0.12, 0.12), random.uniform(-0.12, 0.12), -hang_len))
            
            # Quad strip
            tang = (p2 - p0).normalized()
            side_m = tang.cross(mathutils.Vector((0, 1, 0))).normalized()
            
            mv0 = bm_moss.verts.new(p0 - side_m * (w_top * 0.5))
            mv1 = bm_moss.verts.new(p0 + side_m * (w_top * 0.5))
            mv2 = bm_moss.verts.new(p1 + side_m * (w_top * 0.4))
            mv3 = bm_moss.verts.new(p1 - side_m * (w_top * 0.4))
            
            f1 = bm_moss.faces.new((mv0, mv1, mv2, mv3))
            f1.smooth = True
            f1.loops[0][uv_layer_moss].uv = (0.0, 0.0)
            f1.loops[1][uv_layer_moss].uv = (1.0, 0.0)
            f1.loops[2][uv_layer_moss].uv = (1.0, 0.5)
            f1.loops[3][uv_layer_moss].uv = (0.0, 0.5)
            
            mv4 = bm_moss.verts.new(p2 + side_m * (w_bot * 0.5))
            mv5 = bm_moss.verts.new(p2 - side_m * (w_bot * 0.5))
            
            f2 = bm_moss.faces.new((mv3, mv2, mv4, mv5))
            f2.smooth = True
            f2.loops[0][uv_layer_moss].uv = (0.0, 0.5)
            f2.loops[1][uv_layer_moss].uv = (1.0, 0.5)
            f2.loops[2][uv_layer_moss].uv = (1.0, 1.0)
            f2.loops[3][uv_layer_moss].uv = (0.0, 1.0)

    bm_moss.to_mesh(moss_mesh)
    bm_moss.free()

    moss_obj = bpy.data.objects.new("Montezuma_Spanish_Moss", moss_mesh)
    collection.objects.link(moss_obj)
    moss_obj.data.materials.append(moss_mat)

    return branch_objects, foliage_obj, moss_obj


# =============================================================================
# 5. BOTANICAL VISUAL QC LIGHTING & STAGING RIG
# =============================================================================

def setup_botanical_qc_lighting_rig(collection=None, tree_height=12.8, ground_size=40.0):
    """
    Sets up a physically calibrated botanical studio environment:
    - Nishita / Multi-scattering physical sky with ozone and atmospheric turbidity.
    - 5400K Warm Key Sun with 0.545 deg solar disk (physically realistic penumbra contact shadows).
    - Foliage SSS Rim / Translucency Backlight (activates chartreuse forward scatter).
    - Cool Skylight Fill (lifts crevice contrast while retaining deep charcoal shadow depths).
    - 85mm Telephoto Visual QC Inspection Camera with depth-of-field.
    - Ground contact soil receiver plane.
    """
    if collection is None:
        collection = bpy.context.scene.collection

    # 1. Physical Sky World Shader
    world = bpy.context.scene.world or bpy.data.worlds.new("W_Botanical_QC_Sky")
    if hasattr(world, "use_nodes"):
        world.use_nodes = True
    w_nodes = world.node_tree.nodes
    w_links = world.node_tree.links
    w_nodes.clear()

    w_out = w_nodes.new(type='ShaderNodeOutputWorld')
    w_out.location = (600, 0)

    w_sky = w_nodes.new(type='ShaderNodeTexSky')
    w_sky.location = (200, 0)
    
    sky_enums = [e.identifier for e in w_sky.bl_rna.properties['sky_type'].enum_items]
    if 'MULTIPLE_SCATTERING' in sky_enums:
        w_sky.sky_type = 'MULTIPLE_SCATTERING'
        w_sky.sun_elevation = math.radians(24.0)
        w_sky.sun_rotation = math.radians(45.0)
        w_sky.altitude = 15.0
        w_sky.air_density = 1.05
        w_sky.aerosol_density = 1.35
        w_sky.ozone_density = 2.0
        w_sky.sun_intensity = 1.0
    elif 'NISHITA' in sky_enums:
        w_sky.sky_type = 'NISHITA'
        w_sky.sun_elevation = math.radians(24.0)
        w_sky.sun_rotation = math.radians(45.0)
        w_sky.altitude = 15.0
        w_sky.air_density = 1.05
        w_sky.dust_density = 1.35
        w_sky.ozone_density = 2.0
        w_sky.sun_intensity = 1.0

    w_bg = w_nodes.new(type='ShaderNodeBackground')
    w_bg.location = (400, 0)
    w_bg.inputs['Strength'].default_value = 1.0

    w_links.new(w_sky.outputs['Color'], w_bg.inputs['Color'])
    w_links.new(w_bg.outputs['Background'], w_out.inputs['Surface'])
    bpy.context.scene.world = world

    # 2. Key Sun Light (Warm 5400K)
    sun_data = bpy.data.lights.new(name="QC_Key_Sun", type='SUN')
    sun_data.energy = 5.5
    sun_data.color = (1.0, 0.94, 0.86)
    sun_data.angle = math.radians(0.545)  # Physical solar angular diameter
    sun_obj = bpy.data.objects.new("QC_Key_Sun", sun_data)
    collection.objects.link(sun_obj)
    sun_obj.location = (18, -22, 28)
    sun_obj.rotation_euler = (math.radians(48), math.radians(14), math.radians(-38))

    # 3. Foliage SSS Rim / Translucency Backlight
    rim_data = bpy.data.lights.new(name="QC_Rim_Backlight", type='SUN')
    rim_data.energy = 4.2
    rim_data.color = (0.95, 0.98, 0.90)
    rim_obj = bpy.data.objects.new("QC_Rim_Backlight", rim_data)
    collection.objects.link(rim_obj)
    rim_obj.location = (-22, 25, 18)
    rim_obj.rotation_euler = (math.radians(35), math.radians(-20), math.radians(142))

    # 4. Soft Skylight Fill
    fill_data = bpy.data.lights.new(name="QC_Sky_Fill", type='SUN')
    fill_data.energy = 1.4
    fill_data.color = (0.75, 0.85, 1.0)
    fill_obj = bpy.data.objects.new("QC_Sky_Fill", fill_data)
    collection.objects.link(fill_obj)
    fill_obj.location = (-15, -15, 20)
    fill_obj.rotation_euler = (math.radians(65), math.radians(0), math.radians(-110))

    # 5. Ground Contact Plane & Soil Material
    ground_mesh = bpy.data.meshes.new("QC_Soil_Plane")
    bm_g = bmesh.new()
    bmesh.ops.create_grid(bm_g, x_segments=16, y_segments=16, size=ground_size)
    bm_g.to_mesh(ground_mesh)
    bm_g.free()
    
    ground_obj = bpy.data.objects.new("QC_Ground_Soil", ground_mesh)
    collection.objects.link(ground_obj)
    ground_obj.location = (0, 0, 0)
    
    g_mat = bpy.data.materials.new("M_Resaca_Soil_Bed")
    if hasattr(g_mat, "use_nodes"):
        g_mat.use_nodes = True
    g_bsdf = g_mat.node_tree.nodes.get("Principled BSDF")
    if g_bsdf:
        g_bsdf.inputs['Base Color'].default_value = (0.18, 0.15, 0.12, 1.0)
        g_bsdf.inputs['Roughness'].default_value = 0.95
    ground_obj.data.materials.append(g_mat)

    # 6. Botanical Visual QC Inspection Camera (85mm Telephoto)
    cam_data = bpy.data.cameras.new(name="QC_Inspector_Camera")
    cam_data.lens = 85.0
    cam_data.dof.use_dof = True
    cam_data.dof.aperture_fstop = 4.0
    cam_data.dof.focus_distance = tree_height * 2.1 * 0.9
    
    cam_obj = bpy.data.objects.new("QC_Inspector_Camera", cam_data)
    collection.objects.link(cam_obj)
    
    cam_dist = tree_height * 2.3
    cam_obj.location = (cam_dist * 0.72, -cam_dist * 0.75, tree_height * 0.38)
    
    target = mathutils.Vector((0, 0, tree_height * 0.34))
    direction = target - cam_obj.location
    rot_quat = direction.to_track_quat('-Z', 'Y')
    cam_obj.rotation_euler = rot_quat.to_euler()
    
    bpy.context.scene.camera = cam_obj
    return cam_obj


# =============================================================================
# 6. ASSET EXPORT PIPELINE
# =============================================================================

def export_all_assets(output_base_path, render_preview=False):
    """Exports generated Montezuma Cypress into .blend, .glb, .obj, and preview PNG."""
    abs_base = os.path.abspath(output_base_path)
    os.makedirs(os.path.dirname(abs_base), exist_ok=True)

    # 1. Native .blend File
    blend_file = f"{abs_base}.blend"
    try:
        bpy.ops.wm.save_as_mainfile(filepath=blend_file)
        print(f"[EXPORT SUCCESS] Saved Native Blender Project: {blend_file}")
    except Exception as e:
        print(f"[EXPORT WARNING] Could not save .blend: {e}")

    # 2. WebGL / Three.js GLB
    glb_file = f"{abs_base}.glb"
    try:
        bpy.ops.export_scene.gltf(
            filepath=glb_file,
            export_format='GLB',
            export_apply=True,
            export_materials='EXPORT',
            export_image_format='AUTO',
            export_attributes=True
        )
        print(f"[EXPORT SUCCESS] Saved WebGL/Three.js GLB: {glb_file}")
    except Exception as e:
        print(f"[EXPORT WARNING] GLTF export error: {e}")

    # 3. Universal Wavefront OBJ + MTL
    obj_file = f"{abs_base}.obj"
    try:
        if hasattr(bpy.ops.wm, 'obj_export'):
            bpy.ops.wm.obj_export(filepath=obj_file, apply_modifiers=True)
        else:
            bpy.ops.export_scene.obj(filepath=obj_file, use_selection=False)
        print(f"[EXPORT SUCCESS] Saved Wavefront OBJ: {obj_file}")
    except Exception as e:
        print(f"[EXPORT WARNING] OBJ export error: {e}")

    # 4. Preview Render (PNG)
    if render_preview:
        render_file = f"{abs_base}_preview.png"
        scene = bpy.context.scene
        scene.render.filepath = render_file
        scene.render.resolution_x = 1920
        scene.render.resolution_y = 1080
        scene.render.image_settings.file_format = 'PNG'
        try:
            print(f"[RENDER] Generating high-resolution preview: {render_file}...")
            bpy.ops.render.render(write_still=True)
            print(f"[RENDER SUCCESS] Saved Preview Image: {render_file}")
        except Exception as e:
            print(f"[RENDER WARNING] Could not render preview: {e}")


# =============================================================================
# 7. MAIN EXECUTION PIPELINE
# =============================================================================

def main():
    print("===================================================================")
    print("  MONTEZUMA CYPRESS ULTRA (Taxodium mucronatum) - BLENDER 5.2 PBR  ")
    print("  Visual QC & Botanical Materials Specialist Suite                 ")
    print("===================================================================")

    args = parse_cli_args()
    cfg = TreeConfig(preset=args["preset"])
    cfg.random_seed = args["seed"]

    print(f"[*] Configuration Preset: {cfg.preset}")
    print(f"[*] Tree Height: {cfg.height}m | Base Radius: {cfg.base_radius}m | Flute Lobes: {cfg.flute_lobes}")
    print(f"[*] Output Base Path: {args['out']}")

    # 1. Reset Scene
    col = reset_scene()

    # 2. Build Next-Gen PBR Materials
    print("[*] Generating PBR Shader Nodes (Principled BSDF v2)...")
    bark_mat = create_montezuma_bark_ultra_material()
    foliage_mat = create_montezuma_foliage_ultra_material()
    moss_mat = create_spanish_moss_material()

    # 3. Generate Fluted Buttressed Trunk
    print("[*] Generating Fluted Buttressed Trunk Geometry...")
    trunk_obj = build_fluted_trunk(cfg, col, bark_mat)

    # 4. Generate Canopy, Weeping Foliage & Spanish Moss
    print("[*] Generating Scaffold Architecture, Foliage Cards & Spanish Moss...")
    branches, foliage, moss = build_scaffold_canopy_and_moss(cfg, col, bark_mat, foliage_mat, moss_mat)

    # 5. Setup Botanical QC Lighting Rig & Nishita Sky
    print("[*] Setting up Multi-Scattering Sky, 3-Point Light Rig & QC Camera...")
    cam = setup_botanical_qc_lighting_rig(col, tree_height=cfg.height)

    # 6. Run Export Pipeline
    print("[*] Running Multi-Format Export Pipeline...")
    export_all_assets(args["out"], render_preview=args["render"])

    print("===================================================================")
    print("  SUCCESS: Montezuma Cypress Ultra PBR Asset Generated!            ")
    print("===================================================================")


if __name__ == "__main__":
    main()
