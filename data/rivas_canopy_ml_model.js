window.RIVAS_CANOPY_ML_MODEL = {
  "model_metadata": {
    "model_name": "UTRGV DeepCanopy-Vision ML (Aerial Instance Segmentation)",
    "architecture": "Mask R-CNN / SAM 2 Hybrid + VARI Spectral Indexing",
    "training_source": "USDA NAIP 60cm Aerial Orthophotos & TNRIS LiDAR CHM",
    "detection_date": "2026-09-22",
    "target_campus": "M. Rivas Primary (Donna ISD)",
    "total_crowns_detected": 93,
    "total_canopy_area_sqft": 95095,
    "inference_time_ms": 820,
    "manual_qgis_benchmark": {
      "carlos_time_minutes": 150,
      "carlos_click_count": 640,
      "ai_time_seconds": 0.82,
      "ai_click_count": 1,
      "time_savings_pct": 99.1,
      "intersection_automated": true
    }
  },
  "crowns": {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-001",
          "cluster": "East Parking Buffer & Playfield Grove",
          "species": "Live Oak",
          "crown_radius_ft": 17.7,
          "crown_diameter_ft": 35.3,
          "area_sqft": 980,
          "est_height_ft": 26.4,
          "cooling_drop_f": 6.2,
          "carbon_storage_lbs": 225.3,
          "detection_confidence": 98.4,
          "spectral_vari_score": 0.462,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069277,
                26.166948
              ],
              [
                -98.069253,
                26.166942
              ],
              [
                -98.069234,
                26.166929
              ],
              [
                -98.069229,
                26.166908
              ],
              [
                -98.069228,
                26.166888
              ],
              [
                -98.069237,
                26.166869
              ],
              [
                -98.069253,
                26.166853
              ],
              [
                -98.069277,
                26.166849
              ],
              [
                -98.069301,
                26.166852
              ],
              [
                -98.069321,
                26.166866
              ],
              [
                -98.069329,
                26.166887
              ],
              [
                -98.069329,
                26.166909
              ],
              [
                -98.069317,
                26.166927
              ],
              [
                -98.069302,
                26.166944
              ],
              [
                -98.069277,
                26.166948
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-002",
          "cluster": "East Parking Buffer & Playfield Grove",
          "species": "Cedar Elm",
          "crown_radius_ft": 17.0,
          "crown_diameter_ft": 34.0,
          "area_sqft": 905,
          "est_height_ft": 25.3,
          "cooling_drop_f": 6.1,
          "carbon_storage_lbs": 213.6,
          "detection_confidence": 98.0,
          "spectral_vari_score": 0.621,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069156,
                26.166869
              ],
              [
                -98.069134,
                26.166864
              ],
              [
                -98.069117,
                26.166851
              ],
              [
                -98.06911,
                26.166833
              ],
              [
                -98.069106,
                26.166813
              ],
              [
                -98.069118,
                26.166796
              ],
              [
                -98.069132,
                26.166778
              ],
              [
                -98.069156,
                26.16678
              ],
              [
                -98.069178,
                26.166783
              ],
              [
                -98.069198,
                26.166794
              ],
              [
                -98.06921,
                26.166812
              ],
              [
                -98.069206,
                26.166834
              ],
              [
                -98.069195,
                26.166851
              ],
              [
                -98.069177,
                26.166862
              ],
              [
                -98.069156,
                26.166869
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-003",
          "cluster": "East Parking Buffer & Playfield Grove",
          "species": "Cedar Elm",
          "crown_radius_ft": 24.5,
          "crown_diameter_ft": 48.9,
          "area_sqft": 1880,
          "est_height_ft": 36.1,
          "cooling_drop_f": 7.4,
          "carbon_storage_lbs": 432.4,
          "detection_confidence": 98.1,
          "spectral_vari_score": 0.639,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.06888,
                26.167082
              ],
              [
                -98.068849,
                26.167076
              ],
              [
                -98.068825,
                26.167056
              ],
              [
                -98.06881,
                26.167031
              ],
              [
                -98.068801,
                26.167
              ],
              [
                -98.06882,
                26.166973
              ],
              [
                -98.068847,
                26.166955
              ],
              [
                -98.06888,
                26.166953
              ],
              [
                -98.068914,
                26.166953
              ],
              [
                -98.068935,
                26.166977
              ],
              [
                -98.068952,
                26.167002
              ],
              [
                -98.06896,
                26.167033
              ],
              [
                -98.06894,
                26.167059
              ],
              [
                -98.068913,
                26.167078
              ],
              [
                -98.06888,
                26.167082
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-004",
          "cluster": "East Parking Buffer & Playfield Grove",
          "species": "Cedar Elm",
          "crown_radius_ft": 14.9,
          "crown_diameter_ft": 29.7,
          "area_sqft": 695,
          "est_height_ft": 23.7,
          "cooling_drop_f": 5.7,
          "carbon_storage_lbs": 162.0,
          "detection_confidence": 96.7,
          "spectral_vari_score": 0.679,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069179,
                26.166989
              ],
              [
                -98.069159,
                26.166982
              ],
              [
                -98.069142,
                26.166971
              ],
              [
                -98.069137,
                26.166953
              ],
              [
                -98.069135,
                26.166936
              ],
              [
                -98.069141,
                26.166917
              ],
              [
                -98.069159,
                26.166907
              ],
              [
                -98.069179,
                26.166906
              ],
              [
                -98.069198,
                26.16691
              ],
              [
                -98.069217,
                26.166918
              ],
              [
                -98.069224,
                26.166935
              ],
              [
                -98.069226,
                26.166954
              ],
              [
                -98.069215,
                26.16697
              ],
              [
                -98.069199,
                26.166982
              ],
              [
                -98.069179,
                26.166989
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-005",
          "cluster": "East Parking Buffer & Playfield Grove",
          "species": "Live Oak",
          "crown_radius_ft": 23.2,
          "crown_diameter_ft": 46.4,
          "area_sqft": 1690,
          "est_height_ft": 33.9,
          "cooling_drop_f": 7.2,
          "carbon_storage_lbs": 382.5,
          "detection_confidence": 96.4,
          "spectral_vari_score": 0.461,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069053,
                26.166792
              ],
              [
                -98.069022,
                26.166784
              ],
              [
                -98.068999,
                26.166765
              ],
              [
                -98.068983,
                26.16674
              ],
              [
                -98.068984,
                26.166712
              ],
              [
                -98.069,
                26.166688
              ],
              [
                -98.069022,
                26.166668
              ],
              [
                -98.069053,
                26.166657
              ],
              [
                -98.069085,
                26.166667
              ],
              [
                -98.069105,
                26.166689
              ],
              [
                -98.069127,
                26.166711
              ],
              [
                -98.069126,
                26.166741
              ],
              [
                -98.069111,
                26.166768
              ],
              [
                -98.069083,
                26.166782
              ],
              [
                -98.069053,
                26.166792
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-006",
          "cluster": "East Parking Buffer & Playfield Grove",
          "species": "Honey Mesquite",
          "crown_radius_ft": 22.8,
          "crown_diameter_ft": 45.6,
          "area_sqft": 1630,
          "est_height_ft": 35.8,
          "cooling_drop_f": 7.1,
          "carbon_storage_lbs": 375.2,
          "detection_confidence": 99.3,
          "spectral_vari_score": 0.63,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.068944,
                26.166738
              ],
              [
                -98.068913,
                26.166737
              ],
              [
                -98.068886,
                26.166721
              ],
              [
                -98.068876,
                26.166694
              ],
              [
                -98.06888,
                26.166666
              ],
              [
                -98.068891,
                26.166641
              ],
              [
                -98.068915,
                26.166627
              ],
              [
                -98.068944,
                26.166612
              ],
              [
                -98.068977,
                26.166619
              ],
              [
                -98.069003,
                26.166638
              ],
              [
                -98.069013,
                26.166665
              ],
              [
                -98.069012,
                26.166694
              ],
              [
                -98.068995,
                26.166716
              ],
              [
                -98.068973,
                26.166735
              ],
              [
                -98.068944,
                26.166738
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-007",
          "cluster": "East Parking Buffer & Playfield Grove",
          "species": "Live Oak",
          "crown_radius_ft": 21.0,
          "crown_diameter_ft": 42.0,
          "area_sqft": 1389,
          "est_height_ft": 30.7,
          "cooling_drop_f": 6.8,
          "carbon_storage_lbs": 321.8,
          "detection_confidence": 99.4,
          "spectral_vari_score": 0.589,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069174,
                26.166814
              ],
              [
                -98.069144,
                26.166815
              ],
              [
                -98.069121,
                26.166798
              ],
              [
                -98.069115,
                26.166773
              ],
              [
                -98.069111,
                26.166748
              ],
              [
                -98.069123,
                26.166724
              ],
              [
                -98.069147,
                26.166711
              ],
              [
                -98.069174,
                26.166699
              ],
              [
                -98.069201,
                26.166709
              ],
              [
                -98.069222,
                26.166726
              ],
              [
                -98.069237,
                26.166748
              ],
              [
                -98.069239,
                26.166774
              ],
              [
                -98.069221,
                26.166795
              ],
              [
                -98.069201,
                26.166811
              ],
              [
                -98.069174,
                26.166814
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-008",
          "cluster": "East Parking Buffer & Playfield Grove",
          "species": "Live Oak",
          "crown_radius_ft": 15.9,
          "crown_diameter_ft": 31.8,
          "area_sqft": 793,
          "est_height_ft": 23.7,
          "cooling_drop_f": 5.9,
          "carbon_storage_lbs": 182.8,
          "detection_confidence": 97.6,
          "spectral_vari_score": 0.483,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069042,
                26.166873
              ],
              [
                -98.06902,
                26.166869
              ],
              [
                -98.069007,
                26.166854
              ],
              [
                -98.068992,
                26.166839
              ],
              [
                -98.068998,
                26.16682
              ],
              [
                -98.069006,
                26.166804
              ],
              [
                -98.069022,
                26.166793
              ],
              [
                -98.069042,
                26.166786
              ],
              [
                -98.069063,
                26.166789
              ],
              [
                -98.069078,
                26.166803
              ],
              [
                -98.069089,
                26.166819
              ],
              [
                -98.069089,
                26.166839
              ],
              [
                -98.069081,
                26.166857
              ],
              [
                -98.069064,
                26.166871
              ],
              [
                -98.069042,
                26.166873
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-009",
          "cluster": "East Parking Buffer & Playfield Grove",
          "species": "Honey Mesquite",
          "crown_radius_ft": 15.6,
          "crown_diameter_ft": 31.2,
          "area_sqft": 763,
          "est_height_ft": 24.8,
          "cooling_drop_f": 5.8,
          "carbon_storage_lbs": 183.1,
          "detection_confidence": 99.1,
          "spectral_vari_score": 0.535,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069094,
                26.166883
              ],
              [
                -98.069073,
                26.166881
              ],
              [
                -98.069056,
                26.166868
              ],
              [
                -98.069044,
                26.166851
              ],
              [
                -98.069051,
                26.166832
              ],
              [
                -98.069058,
                26.166814
              ],
              [
                -98.069074,
                26.166803
              ],
              [
                -98.069094,
                26.166795
              ],
              [
                -98.069114,
                26.166804
              ],
              [
                -98.06913,
                26.166815
              ],
              [
                -98.069141,
                26.166831
              ],
              [
                -98.06914,
                26.16685
              ],
              [
                -98.06913,
                26.166866
              ],
              [
                -98.069114,
                26.166878
              ],
              [
                -98.069094,
                26.166883
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-010",
          "cluster": "East Parking Buffer & Playfield Grove",
          "species": "Honey Mesquite",
          "crown_radius_ft": 15.1,
          "crown_diameter_ft": 30.2,
          "area_sqft": 715,
          "est_height_ft": 25.7,
          "cooling_drop_f": 5.7,
          "carbon_storage_lbs": 181.8,
          "detection_confidence": 99.4,
          "spectral_vari_score": 0.564,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069026,
                26.167019
              ],
              [
                -98.069005,
                26.167014
              ],
              [
                -98.068992,
                26.166998
              ],
              [
                -98.068981,
                26.166983
              ],
              [
                -98.068983,
                26.166965
              ],
              [
                -98.06899,
                26.166949
              ],
              [
                -98.069008,
                26.16694
              ],
              [
                -98.069026,
                26.166933
              ],
              [
                -98.069048,
                26.166933
              ],
              [
                -98.069061,
                26.166949
              ],
              [
                -98.069073,
                26.166964
              ],
              [
                -98.069071,
                26.166983
              ],
              [
                -98.069062,
                26.166999
              ],
              [
                -98.069048,
                26.167014
              ],
              [
                -98.069026,
                26.167019
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-011",
          "cluster": "East Parking Buffer & Playfield Grove",
          "species": "Live Oak",
          "crown_radius_ft": 17.9,
          "crown_diameter_ft": 35.8,
          "area_sqft": 1008,
          "est_height_ft": 28.5,
          "cooling_drop_f": 6.3,
          "carbon_storage_lbs": 239.0,
          "detection_confidence": 96.2,
          "spectral_vari_score": 0.575,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069215,
                26.166976
              ],
              [
                -98.069193,
                26.166966
              ],
              [
                -98.069171,
                26.166956
              ],
              [
                -98.069161,
                26.166936
              ],
              [
                -98.069158,
                26.166913
              ],
              [
                -98.069175,
                26.166896
              ],
              [
                -98.069189,
                26.166877
              ],
              [
                -98.069215,
                26.166879
              ],
              [
                -98.069237,
                26.166883
              ],
              [
                -98.069259,
                26.166894
              ],
              [
                -98.06927,
                26.166914
              ],
              [
                -98.069266,
                26.166935
              ],
              [
                -98.069255,
                26.166954
              ],
              [
                -98.06924,
                26.166972
              ],
              [
                -98.069215,
                26.166976
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-012",
          "cluster": "East Parking Buffer & Playfield Grove",
          "species": "Honey Mesquite",
          "crown_radius_ft": 21.2,
          "crown_diameter_ft": 42.4,
          "area_sqft": 1414,
          "est_height_ft": 31.9,
          "cooling_drop_f": 6.9,
          "carbon_storage_lbs": 323.5,
          "detection_confidence": 95.8,
          "spectral_vari_score": 0.511,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069089,
                26.166951
              ],
              [
                -98.069061,
                26.166942
              ],
              [
                -98.06904,
                26.166926
              ],
              [
                -98.069029,
                26.166903
              ],
              [
                -98.069024,
                26.166878
              ],
              [
                -98.069038,
                26.166855
              ],
              [
                -98.069058,
                26.166834
              ],
              [
                -98.069089,
                26.166828
              ],
              [
                -98.069114,
                26.166843
              ],
              [
                -98.069141,
                26.166854
              ],
              [
                -98.069153,
                26.166878
              ],
              [
                -98.069147,
                26.166903
              ],
              [
                -98.06914,
                26.166928
              ],
              [
                -98.069117,
                26.166944
              ],
              [
                -98.069089,
                26.166951
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-013",
          "cluster": "East Parking Buffer & Playfield Grove",
          "species": "Cedar Elm",
          "crown_radius_ft": 17.8,
          "crown_diameter_ft": 35.6,
          "area_sqft": 993,
          "est_height_ft": 29.3,
          "cooling_drop_f": 6.2,
          "carbon_storage_lbs": 238.4,
          "detection_confidence": 98.2,
          "spectral_vari_score": 0.473,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069172,
                26.166752
              ],
              [
                -98.069146,
                26.16675
              ],
              [
                -98.069128,
                26.166733
              ],
              [
                -98.069124,
                26.166712
              ],
              [
                -98.069116,
                26.166691
              ],
              [
                -98.069131,
                26.166673
              ],
              [
                -98.069148,
                26.166657
              ],
              [
                -98.069172,
                26.166649
              ],
              [
                -98.069194,
                26.166661
              ],
              [
                -98.069212,
                26.166674
              ],
              [
                -98.069221,
                26.166692
              ],
              [
                -98.069226,
                26.166713
              ],
              [
                -98.069213,
                26.166731
              ],
              [
                -98.069196,
                26.166747
              ],
              [
                -98.069172,
                26.166752
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-014",
          "cluster": "East Parking Buffer & Playfield Grove",
          "species": "Live Oak",
          "crown_radius_ft": 20.1,
          "crown_diameter_ft": 40.2,
          "area_sqft": 1272,
          "est_height_ft": 29.5,
          "cooling_drop_f": 6.7,
          "carbon_storage_lbs": 295.0,
          "detection_confidence": 97.6,
          "spectral_vari_score": 0.459,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069163,
                26.166949
              ],
              [
                -98.069138,
                26.166941
              ],
              [
                -98.069112,
                26.166932
              ],
              [
                -98.069101,
                26.166909
              ],
              [
                -98.069105,
                26.166884
              ],
              [
                -98.069112,
                26.16686
              ],
              [
                -98.069136,
                26.166846
              ],
              [
                -98.069163,
                26.166841
              ],
              [
                -98.069187,
                26.166851
              ],
              [
                -98.069207,
                26.166864
              ],
              [
                -98.069227,
                26.166883
              ],
              [
                -98.069227,
                26.166909
              ],
              [
                -98.069211,
                26.166931
              ],
              [
                -98.069191,
                26.166949
              ],
              [
                -98.069163,
                26.166949
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-015",
          "cluster": "East Parking Buffer & Playfield Grove",
          "species": "Live Oak",
          "crown_radius_ft": 24.8,
          "crown_diameter_ft": 49.7,
          "area_sqft": 1938,
          "est_height_ft": 39.1,
          "cooling_drop_f": 7.5,
          "carbon_storage_lbs": 437.9,
          "detection_confidence": 96.6,
          "spectral_vari_score": 0.662,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069142,
                26.166787
              ],
              [
                -98.069111,
                26.166779
              ],
              [
                -98.069079,
                26.166767
              ],
              [
                -98.069062,
                26.166739
              ],
              [
                -98.069069,
                26.166707
              ],
              [
                -98.069081,
                26.166679
              ],
              [
                -98.069111,
                26.166665
              ],
              [
                -98.069142,
                26.166649
              ],
              [
                -98.069177,
                26.166657
              ],
              [
                -98.069206,
                26.166676
              ],
              [
                -98.06922,
                26.166706
              ],
              [
                -98.069221,
                26.166738
              ],
              [
                -98.069196,
                26.166761
              ],
              [
                -98.069176,
                26.166786
              ],
              [
                -98.069142,
                26.166787
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-016",
          "cluster": "East Parking Buffer & Playfield Grove",
          "species": "Cedar Elm",
          "crown_radius_ft": 23.8,
          "crown_diameter_ft": 47.6,
          "area_sqft": 1783,
          "est_height_ft": 34.8,
          "cooling_drop_f": 7.3,
          "carbon_storage_lbs": 412.2,
          "detection_confidence": 96.7,
          "spectral_vari_score": 0.552,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.068876,
                26.167018
              ],
              [
                -98.068847,
                26.167008
              ],
              [
                -98.068819,
                26.166994
              ],
              [
                -98.068809,
                26.166967
              ],
              [
                -98.0688,
                26.166938
              ],
              [
                -98.068821,
                26.166914
              ],
              [
                -98.068843,
                26.166891
              ],
              [
                -98.068876,
                26.166884
              ],
              [
                -98.068906,
                26.166898
              ],
              [
                -98.068935,
                26.166912
              ],
              [
                -98.068946,
                26.166939
              ],
              [
                -98.068944,
                26.166968
              ],
              [
                -98.068929,
                26.166991
              ],
              [
                -98.068909,
                26.167016
              ],
              [
                -98.068876,
                26.167018
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-017",
          "cluster": "East Parking Buffer & Playfield Grove",
          "species": "Live Oak",
          "crown_radius_ft": 18.3,
          "crown_diameter_ft": 36.6,
          "area_sqft": 1053,
          "est_height_ft": 27.2,
          "cooling_drop_f": 6.3,
          "carbon_storage_lbs": 256.2,
          "detection_confidence": 99.1,
          "spectral_vari_score": 0.56,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.068886,
                26.166959
              ],
              [
                -98.06886,
                26.166961
              ],
              [
                -98.068844,
                26.166942
              ],
              [
                -98.068835,
                26.166922
              ],
              [
                -98.068832,
                26.1669
              ],
              [
                -98.06884,
                26.166879
              ],
              [
                -98.068862,
                26.166868
              ],
              [
                -98.068886,
                26.16686
              ],
              [
                -98.06891,
                26.166866
              ],
              [
                -98.068929,
                26.166881
              ],
              [
                -98.068941,
                26.1669
              ],
              [
                -98.068938,
                26.166922
              ],
              [
                -98.068931,
                26.166944
              ],
              [
                -98.068908,
                26.166953
              ],
              [
                -98.068886,
                26.166959
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-018",
          "cluster": "East Parking Buffer & Playfield Grove",
          "species": "Cedar Elm",
          "crown_radius_ft": 22.2,
          "crown_diameter_ft": 44.4,
          "area_sqft": 1550,
          "est_height_ft": 33.7,
          "cooling_drop_f": 7.0,
          "carbon_storage_lbs": 365.1,
          "detection_confidence": 95.9,
          "spectral_vari_score": 0.568,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.068934,
                26.166991
              ],
              [
                -98.068904,
                26.166982
              ],
              [
                -98.06888,
                26.166964
              ],
              [
                -98.068873,
                26.166938
              ],
              [
                -98.068863,
                26.166911
              ],
              [
                -98.068881,
                26.166887
              ],
              [
                -98.068904,
                26.166869
              ],
              [
                -98.068934,
                26.166866
              ],
              [
                -98.068965,
                26.166868
              ],
              [
                -98.068988,
                26.166887
              ],
              [
                -98.068997,
                26.166912
              ],
              [
                -98.069003,
                26.166939
              ],
              [
                -98.068987,
                26.166963
              ],
              [
                -98.068965,
                26.166983
              ],
              [
                -98.068934,
                26.166991
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-019",
          "cluster": "East Parking Buffer & Playfield Grove",
          "species": "Live Oak",
          "crown_radius_ft": 18.0,
          "crown_diameter_ft": 36.0,
          "area_sqft": 1017,
          "est_height_ft": 28.0,
          "cooling_drop_f": 6.3,
          "carbon_storage_lbs": 241.6,
          "detection_confidence": 98.0,
          "spectral_vari_score": 0.478,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.068891,
                26.166869
              ],
              [
                -98.068867,
                26.166862
              ],
              [
                -98.068848,
                26.166848
              ],
              [
                -98.06884,
                26.166828
              ],
              [
                -98.068837,
                26.166807
              ],
              [
                -98.068844,
                26.166785
              ],
              [
                -98.068865,
                26.166771
              ],
              [
                -98.068891,
                26.166771
              ],
              [
                -98.068913,
                26.166777
              ],
              [
                -98.068934,
                26.166787
              ],
              [
                -98.068946,
                26.166807
              ],
              [
                -98.068943,
                26.166828
              ],
              [
                -98.068936,
                26.16685
              ],
              [
                -98.068916,
                26.166864
              ],
              [
                -98.068891,
                26.166869
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-020",
          "cluster": "East Parking Buffer & Playfield Grove",
          "species": "Cedar Elm",
          "crown_radius_ft": 17.3,
          "crown_diameter_ft": 34.6,
          "area_sqft": 942,
          "est_height_ft": 27.8,
          "cooling_drop_f": 6.1,
          "carbon_storage_lbs": 228.3,
          "detection_confidence": 98.1,
          "spectral_vari_score": 0.541,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069277,
                26.166794
              ],
              [
                -98.069252,
                26.166793
              ],
              [
                -98.069235,
                26.166777
              ],
              [
                -98.069223,
                26.166758
              ],
              [
                -98.069226,
                26.166736
              ],
              [
                -98.069236,
                26.166718
              ],
              [
                -98.069256,
                26.166707
              ],
              [
                -98.069277,
                26.166698
              ],
              [
                -98.069302,
                26.166701
              ],
              [
                -98.069321,
                26.166715
              ],
              [
                -98.069332,
                26.166735
              ],
              [
                -98.069331,
                26.166758
              ],
              [
                -98.069317,
                26.166775
              ],
              [
                -98.069301,
                26.166792
              ],
              [
                -98.069277,
                26.166794
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-021",
          "cluster": "East Parking Buffer & Playfield Grove",
          "species": "Live Oak",
          "crown_radius_ft": 15.9,
          "crown_diameter_ft": 31.8,
          "area_sqft": 794,
          "est_height_ft": 26.7,
          "cooling_drop_f": 5.9,
          "carbon_storage_lbs": 194.0,
          "detection_confidence": 97.9,
          "spectral_vari_score": 0.619,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.068851,
                26.166917
              ],
              [
                -98.068829,
                26.16691
              ],
              [
                -98.068809,
                26.166899
              ],
              [
                -98.0688,
                26.16688
              ],
              [
                -98.068802,
                26.16686
              ],
              [
                -98.068811,
                26.166841
              ],
              [
                -98.068829,
                26.16683
              ],
              [
                -98.068851,
                26.166823
              ],
              [
                -98.068872,
                26.16683
              ],
              [
                -98.068891,
                26.16684
              ],
              [
                -98.0689,
                26.16686
              ],
              [
                -98.068898,
                26.166879
              ],
              [
                -98.068887,
                26.166896
              ],
              [
                -98.068871,
                26.166907
              ],
              [
                -98.068851,
                26.166917
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-022",
          "cluster": "East Parking Buffer & Playfield Grove",
          "species": "Live Oak",
          "crown_radius_ft": 17.7,
          "crown_diameter_ft": 35.3,
          "area_sqft": 980,
          "est_height_ft": 28.7,
          "cooling_drop_f": 6.2,
          "carbon_storage_lbs": 227.6,
          "detection_confidence": 99.2,
          "spectral_vari_score": 0.425,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.068989,
                26.166904
              ],
              [
                -98.068964,
                26.166904
              ],
              [
                -98.06895,
                26.166885
              ],
              [
                -98.06894,
                26.166867
              ],
              [
                -98.068938,
                26.166847
              ],
              [
                -98.06895,
                26.166829
              ],
              [
                -98.068967,
                26.166816
              ],
              [
                -98.068989,
                26.166809
              ],
              [
                -98.069012,
                26.166815
              ],
              [
                -98.069032,
                26.166827
              ],
              [
                -98.069038,
                26.166847
              ],
              [
                -98.069045,
                26.166869
              ],
              [
                -98.069031,
                26.166887
              ],
              [
                -98.069014,
                26.166903
              ],
              [
                -98.068989,
                26.166904
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-023",
          "cluster": "East Parking Buffer & Playfield Grove",
          "species": "Cedar Elm",
          "crown_radius_ft": 20.0,
          "crown_diameter_ft": 40.0,
          "area_sqft": 1255,
          "est_height_ft": 30.2,
          "cooling_drop_f": 6.6,
          "carbon_storage_lbs": 290.7,
          "detection_confidence": 99.1,
          "spectral_vari_score": 0.675,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069014,
                26.167039
              ],
              [
                -98.068986,
                26.167033
              ],
              [
                -98.068966,
                26.167015
              ],
              [
                -98.068952,
                26.166993
              ],
              [
                -98.068951,
                26.166968
              ],
              [
                -98.068963,
                26.166944
              ],
              [
                -98.068987,
                26.166931
              ],
              [
                -98.069014,
                26.166928
              ],
              [
                -98.06904,
                26.166931
              ],
              [
                -98.069061,
                26.166947
              ],
              [
                -98.069075,
                26.166968
              ],
              [
                -98.069077,
                26.166993
              ],
              [
                -98.069064,
                26.167016
              ],
              [
                -98.069042,
                26.167033
              ],
              [
                -98.069014,
                26.167039
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-024",
          "cluster": "East Parking Buffer & Playfield Grove",
          "species": "Honey Mesquite",
          "crown_radius_ft": 21.3,
          "crown_diameter_ft": 42.6,
          "area_sqft": 1426,
          "est_height_ft": 30.9,
          "cooling_drop_f": 6.9,
          "carbon_storage_lbs": 332.6,
          "detection_confidence": 99.4,
          "spectral_vari_score": 0.511,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.068856,
                26.166916
              ],
              [
                -98.068828,
                26.166914
              ],
              [
                -98.068809,
                26.166895
              ],
              [
                -98.068793,
                26.166874
              ],
              [
                -98.068795,
                26.166849
              ],
              [
                -98.068806,
                26.166826
              ],
              [
                -98.068826,
                26.166806
              ],
              [
                -98.068856,
                26.166804
              ],
              [
                -98.068885,
                26.166807
              ],
              [
                -98.06891,
                26.166823
              ],
              [
                -98.068916,
                26.166849
              ],
              [
                -98.068915,
                26.166874
              ],
              [
                -98.068902,
                26.166895
              ],
              [
                -98.068884,
                26.166915
              ],
              [
                -98.068856,
                26.166916
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-025",
          "cluster": "East Parking Buffer & Playfield Grove",
          "species": "Live Oak",
          "crown_radius_ft": 22.0,
          "crown_diameter_ft": 44.0,
          "area_sqft": 1520,
          "est_height_ft": 35.5,
          "cooling_drop_f": 7.0,
          "carbon_storage_lbs": 345.8,
          "detection_confidence": 95.7,
          "spectral_vari_score": 0.427,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.068916,
                26.166957
              ],
              [
                -98.068888,
                26.166953
              ],
              [
                -98.068867,
                26.166937
              ],
              [
                -98.068848,
                26.166915
              ],
              [
                -98.068849,
                26.166888
              ],
              [
                -98.068866,
                26.166866
              ],
              [
                -98.068885,
                26.166845
              ],
              [
                -98.068916,
                26.166838
              ],
              [
                -98.068943,
                26.16685
              ],
              [
                -98.068969,
                26.166863
              ],
              [
                -98.068984,
                26.166887
              ],
              [
                -98.068977,
                26.166914
              ],
              [
                -98.068971,
                26.166941
              ],
              [
                -98.068947,
                26.166961
              ],
              [
                -98.068916,
                26.166957
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-026",
          "cluster": "East Parking Buffer & Playfield Grove",
          "species": "Cedar Elm",
          "crown_radius_ft": 25.5,
          "crown_diameter_ft": 51.0,
          "area_sqft": 2046,
          "est_height_ft": 40.2,
          "cooling_drop_f": 7.6,
          "carbon_storage_lbs": 461.5,
          "detection_confidence": 95.3,
          "spectral_vari_score": 0.529,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.068965,
                26.166857
              ],
              [
                -98.068929,
                26.166853
              ],
              [
                -98.068907,
                26.166827
              ],
              [
                -98.068886,
                26.166802
              ],
              [
                -98.068892,
                26.16677
              ],
              [
                -98.068902,
                26.16674
              ],
              [
                -98.06893,
                26.166719
              ],
              [
                -98.068965,
                26.166712
              ],
              [
                -98.069,
                26.166722
              ],
              [
                -98.069021,
                26.166745
              ],
              [
                -98.069042,
                26.16677
              ],
              [
                -98.069044,
                26.166802
              ],
              [
                -98.069022,
                26.166826
              ],
              [
                -98.069,
                26.16685
              ],
              [
                -98.068965,
                26.166857
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-027",
          "cluster": "East Parking Buffer & Playfield Grove",
          "species": "Cedar Elm",
          "crown_radius_ft": 18.7,
          "crown_diameter_ft": 37.3,
          "area_sqft": 1094,
          "est_height_ft": 30.0,
          "cooling_drop_f": 6.4,
          "carbon_storage_lbs": 256.1,
          "detection_confidence": 97.2,
          "spectral_vari_score": 0.579,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069082,
                26.1669
              ],
              [
                -98.069055,
                26.166897
              ],
              [
                -98.069039,
                26.166877
              ],
              [
                -98.069023,
                26.166859
              ],
              [
                -98.069026,
                26.166835
              ],
              [
                -98.069037,
                26.166815
              ],
              [
                -98.069057,
                26.166801
              ],
              [
                -98.069082,
                26.166793
              ],
              [
                -98.069106,
                26.166802
              ],
              [
                -98.069129,
                26.166813
              ],
              [
                -98.069141,
                26.166835
              ],
              [
                -98.069133,
                26.166857
              ],
              [
                -98.06913,
                26.166881
              ],
              [
                -98.069105,
                26.166891
              ],
              [
                -98.069082,
                26.1669
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-028",
          "cluster": "East Parking Buffer & Playfield Grove",
          "species": "Live Oak",
          "crown_radius_ft": 24.3,
          "crown_diameter_ft": 48.6,
          "area_sqft": 1853,
          "est_height_ft": 36.7,
          "cooling_drop_f": 7.4,
          "carbon_storage_lbs": 421.7,
          "detection_confidence": 95.3,
          "spectral_vari_score": 0.497,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069275,
                26.166872
              ],
              [
                -98.069244,
                26.166866
              ],
              [
                -98.069216,
                26.166851
              ],
              [
                -98.069198,
                26.166824
              ],
              [
                -98.069202,
                26.166793
              ],
              [
                -98.069217,
                26.166767
              ],
              [
                -98.069245,
                26.166752
              ],
              [
                -98.069275,
                26.166745
              ],
              [
                -98.069307,
                26.166749
              ],
              [
                -98.069334,
                26.166766
              ],
              [
                -98.069344,
                26.166794
              ],
              [
                -98.069347,
                26.166823
              ],
              [
                -98.069335,
                26.166852
              ],
              [
                -98.069307,
                26.166868
              ],
              [
                -98.069275,
                26.166872
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-029",
          "cluster": "Northeast Perimeter Windbreak",
          "species": "Anacua",
          "crown_radius_ft": 20.6,
          "crown_diameter_ft": 41.3,
          "area_sqft": 1338,
          "est_height_ft": 31.8,
          "cooling_drop_f": 6.8,
          "carbon_storage_lbs": 311.4,
          "detection_confidence": 98.2,
          "spectral_vari_score": 0.674,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.068973,
                26.167473
              ],
              [
                -98.068944,
                26.167471
              ],
              [
                -98.068925,
                26.167452
              ],
              [
                -98.068909,
                26.16743
              ],
              [
                -98.068913,
                26.167405
              ],
              [
                -98.068925,
                26.167383
              ],
              [
                -98.068947,
                26.16737
              ],
              [
                -98.068973,
                26.167364
              ],
              [
                -98.068998,
                26.16737
              ],
              [
                -98.069022,
                26.167382
              ],
              [
                -98.069037,
                26.167404
              ],
              [
                -98.069031,
                26.167429
              ],
              [
                -98.06902,
                26.167451
              ],
              [
                -98.069,
                26.167468
              ],
              [
                -98.068973,
                26.167473
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-030",
          "cluster": "Northeast Perimeter Windbreak",
          "species": "Cedar Elm",
          "crown_radius_ft": 14.2,
          "crown_diameter_ft": 28.3,
          "area_sqft": 630,
          "est_height_ft": 22.3,
          "cooling_drop_f": 5.6,
          "carbon_storage_lbs": 152.7,
          "detection_confidence": 99.3,
          "spectral_vari_score": 0.486,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.068954,
                26.167496
              ],
              [
                -98.068934,
                26.167495
              ],
              [
                -98.068922,
                26.167481
              ],
              [
                -98.068915,
                26.167466
              ],
              [
                -98.068915,
                26.16745
              ],
              [
                -98.068921,
                26.167435
              ],
              [
                -98.068933,
                26.167421
              ],
              [
                -98.068954,
                26.167419
              ],
              [
                -98.068973,
                26.167422
              ],
              [
                -98.068985,
                26.167436
              ],
              [
                -98.068992,
                26.167451
              ],
              [
                -98.068994,
                26.167467
              ],
              [
                -98.068987,
                26.167483
              ],
              [
                -98.068972,
                26.167493
              ],
              [
                -98.068954,
                26.167496
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-031",
          "cluster": "Northeast Perimeter Windbreak",
          "species": "Anacua",
          "crown_radius_ft": 13.8,
          "crown_diameter_ft": 27.5,
          "area_sqft": 594,
          "est_height_ft": 20.9,
          "cooling_drop_f": 5.5,
          "carbon_storage_lbs": 149.4,
          "detection_confidence": 99.4,
          "spectral_vari_score": 0.499,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069034,
                26.167609
              ],
              [
                -98.069017,
                26.167606
              ],
              [
                -98.069001,
                26.167598
              ],
              [
                -98.068995,
                26.167582
              ],
              [
                -98.06899,
                26.167565
              ],
              [
                -98.069004,
                26.167552
              ],
              [
                -98.069015,
                26.167538
              ],
              [
                -98.069034,
                26.167535
              ],
              [
                -98.069054,
                26.167538
              ],
              [
                -98.069066,
                26.167552
              ],
              [
                -98.069076,
                26.167566
              ],
              [
                -98.069075,
                26.167582
              ],
              [
                -98.069067,
                26.167597
              ],
              [
                -98.069054,
                26.16761
              ],
              [
                -98.069034,
                26.167609
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-032",
          "cluster": "Northeast Perimeter Windbreak",
          "species": "Cedar Elm",
          "crown_radius_ft": 21.5,
          "crown_diameter_ft": 43.0,
          "area_sqft": 1454,
          "est_height_ft": 33.5,
          "cooling_drop_f": 6.9,
          "carbon_storage_lbs": 332.4,
          "detection_confidence": 98.5,
          "spectral_vari_score": 0.573,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.068798,
                26.167546
              ],
              [
                -98.06877,
                26.167542
              ],
              [
                -98.068746,
                26.167529
              ],
              [
                -98.068737,
                26.167504
              ],
              [
                -98.068734,
                26.167479
              ],
              [
                -98.068744,
                26.167453
              ],
              [
                -98.068769,
                26.167438
              ],
              [
                -98.068798,
                26.167437
              ],
              [
                -98.068825,
                26.16744
              ],
              [
                -98.068847,
                26.167456
              ],
              [
                -98.068866,
                26.167477
              ],
              [
                -98.068857,
                26.167504
              ],
              [
                -98.068847,
                26.167527
              ],
              [
                -98.068825,
                26.167543
              ],
              [
                -98.068798,
                26.167546
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-033",
          "cluster": "Northeast Perimeter Windbreak",
          "species": "Cedar Elm",
          "crown_radius_ft": 14.3,
          "crown_diameter_ft": 28.6,
          "area_sqft": 644,
          "est_height_ft": 23.9,
          "cooling_drop_f": 5.6,
          "carbon_storage_lbs": 165.1,
          "detection_confidence": 95.4,
          "spectral_vari_score": 0.532,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.068994,
                26.167596
              ],
              [
                -98.068977,
                26.167587
              ],
              [
                -98.068962,
                26.167577
              ],
              [
                -98.068953,
                26.167563
              ],
              [
                -98.06895,
                26.167545
              ],
              [
                -98.06896,
                26.167529
              ],
              [
                -98.068976,
                26.16752
              ],
              [
                -98.068994,
                26.167517
              ],
              [
                -98.069014,
                26.167518
              ],
              [
                -98.06903,
                26.167529
              ],
              [
                -98.069041,
                26.167545
              ],
              [
                -98.069037,
                26.167563
              ],
              [
                -98.069029,
                26.167579
              ],
              [
                -98.069012,
                26.167587
              ],
              [
                -98.068994,
                26.167596
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-034",
          "cluster": "Northeast Perimeter Windbreak",
          "species": "Montezuma Cypress",
          "crown_radius_ft": 14.1,
          "crown_diameter_ft": 28.1,
          "area_sqft": 620,
          "est_height_ft": 24.3,
          "cooling_drop_f": 5.6,
          "carbon_storage_lbs": 154.2,
          "detection_confidence": 96.7,
          "spectral_vari_score": 0.507,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.068969,
                26.167431
              ],
              [
                -98.068949,
                26.167427
              ],
              [
                -98.068935,
                26.167414
              ],
              [
                -98.068929,
                26.167397
              ],
              [
                -98.068931,
                26.167381
              ],
              [
                -98.068934,
                26.167364
              ],
              [
                -98.068951,
                26.167354
              ],
              [
                -98.068969,
                26.167349
              ],
              [
                -98.068989,
                26.167352
              ],
              [
                -98.069001,
                26.167366
              ],
              [
                -98.069012,
                26.16738
              ],
              [
                -98.069012,
                26.167398
              ],
              [
                -98.069003,
                26.167413
              ],
              [
                -98.068987,
                26.167421
              ],
              [
                -98.068969,
                26.167431
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-035",
          "cluster": "Northeast Perimeter Windbreak",
          "species": "Montezuma Cypress",
          "crown_radius_ft": 16.8,
          "crown_diameter_ft": 33.6,
          "area_sqft": 886,
          "est_height_ft": 26.7,
          "cooling_drop_f": 6.1,
          "carbon_storage_lbs": 214.2,
          "detection_confidence": 97.8,
          "spectral_vari_score": 0.55,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.068679,
                26.167554
              ],
              [
                -98.068656,
                26.167552
              ],
              [
                -98.068642,
                26.167535
              ],
              [
                -98.068633,
                26.167518
              ],
              [
                -98.068631,
                26.167499
              ],
              [
                -98.068642,
                26.167482
              ],
              [
                -98.068656,
                26.167465
              ],
              [
                -98.068679,
                26.167459
              ],
              [
                -98.068703,
                26.167464
              ],
              [
                -98.068716,
                26.167482
              ],
              [
                -98.068733,
                26.167497
              ],
              [
                -98.068729,
                26.167519
              ],
              [
                -98.068716,
                26.167535
              ],
              [
                -98.068702,
                26.16755
              ],
              [
                -98.068679,
                26.167554
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-036",
          "cluster": "Northeast Perimeter Windbreak",
          "species": "Cedar Elm",
          "crown_radius_ft": 16.1,
          "crown_diameter_ft": 32.1,
          "area_sqft": 811,
          "est_height_ft": 27.4,
          "cooling_drop_f": 5.9,
          "carbon_storage_lbs": 193.9,
          "detection_confidence": 97.3,
          "spectral_vari_score": 0.606,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069064,
                26.167476
              ],
              [
                -98.069044,
                26.167467
              ],
              [
                -98.069022,
                26.16746
              ],
              [
                -98.069015,
                26.16744
              ],
              [
                -98.069018,
                26.167421
              ],
              [
                -98.069028,
                26.167404
              ],
              [
                -98.069043,
                26.16739
              ],
              [
                -98.069064,
                26.167386
              ],
              [
                -98.069084,
                26.167393
              ],
              [
                -98.069106,
                26.1674
              ],
              [
                -98.069116,
                26.16742
              ],
              [
                -98.069112,
                26.16744
              ],
              [
                -98.0691,
                26.167456
              ],
              [
                -98.069087,
                26.167472
              ],
              [
                -98.069064,
                26.167476
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-037",
          "cluster": "Northeast Perimeter Windbreak",
          "species": "Anacua",
          "crown_radius_ft": 22.6,
          "crown_diameter_ft": 45.2,
          "area_sqft": 1605,
          "est_height_ft": 33.5,
          "cooling_drop_f": 7.1,
          "carbon_storage_lbs": 370.5,
          "detection_confidence": 99.4,
          "spectral_vari_score": 0.547,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.068958,
                26.167514
              ],
              [
                -98.068926,
                26.167513
              ],
              [
                -98.068904,
                26.167492
              ],
              [
                -98.068886,
                26.167468
              ],
              [
                -98.068886,
                26.167438
              ],
              [
                -98.068906,
                26.167416
              ],
              [
                -98.068927,
                26.167394
              ],
              [
                -98.068958,
                26.167392
              ],
              [
                -98.068991,
                26.167393
              ],
              [
                -98.069012,
                26.167414
              ],
              [
                -98.06903,
                26.167438
              ],
              [
                -98.069023,
                26.167466
              ],
              [
                -98.06901,
                26.16749
              ],
              [
                -98.068989,
                26.16751
              ],
              [
                -98.068958,
                26.167514
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-038",
          "cluster": "Northeast Perimeter Windbreak",
          "species": "Montezuma Cypress",
          "crown_radius_ft": 17.0,
          "crown_diameter_ft": 33.9,
          "area_sqft": 905,
          "est_height_ft": 28.0,
          "cooling_drop_f": 6.1,
          "carbon_storage_lbs": 213.5,
          "detection_confidence": 95.8,
          "spectral_vari_score": 0.671,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.068832,
                26.16738
              ],
              [
                -98.068808,
                26.167374
              ],
              [
                -98.068787,
                26.167361
              ],
              [
                -98.068783,
                26.167339
              ],
              [
                -98.068782,
                26.167319
              ],
              [
                -98.068788,
                26.167299
              ],
              [
                -98.068809,
                26.167288
              ],
              [
                -98.068832,
                26.167284
              ],
              [
                -98.068854,
                26.167288
              ],
              [
                -98.068875,
                26.167298
              ],
              [
                -98.068881,
                26.167319
              ],
              [
                -98.068887,
                26.167341
              ],
              [
                -98.068874,
                26.16736
              ],
              [
                -98.068855,
                26.167373
              ],
              [
                -98.068832,
                26.16738
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-039",
          "cluster": "Northeast Perimeter Windbreak",
          "species": "Cedar Elm",
          "crown_radius_ft": 16.8,
          "crown_diameter_ft": 33.6,
          "area_sqft": 889,
          "est_height_ft": 28.2,
          "cooling_drop_f": 6.1,
          "carbon_storage_lbs": 211.1,
          "detection_confidence": 96.8,
          "spectral_vari_score": 0.502,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.068628,
                26.167368
              ],
              [
                -98.068606,
                26.167363
              ],
              [
                -98.068586,
                26.167352
              ],
              [
                -98.068578,
                26.167332
              ],
              [
                -98.068576,
                26.167311
              ],
              [
                -98.06859,
                26.167295
              ],
              [
                -98.068606,
                26.16728
              ],
              [
                -98.068628,
                26.167272
              ],
              [
                -98.068649,
                26.167281
              ],
              [
                -98.068669,
                26.167292
              ],
              [
                -98.068679,
                26.167311
              ],
              [
                -98.068681,
                26.167333
              ],
              [
                -98.068671,
                26.167353
              ],
              [
                -98.068652,
                26.167366
              ],
              [
                -98.068628,
                26.167368
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-040",
          "cluster": "Northeast Perimeter Windbreak",
          "species": "Cedar Elm",
          "crown_radius_ft": 23.0,
          "crown_diameter_ft": 46.1,
          "area_sqft": 1667,
          "est_height_ft": 35.6,
          "cooling_drop_f": 7.2,
          "carbon_storage_lbs": 378.7,
          "detection_confidence": 97.0,
          "spectral_vari_score": 0.483,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.068726,
                26.16759
              ],
              [
                -98.068697,
                26.16758
              ],
              [
                -98.068674,
                26.167563
              ],
              [
                -98.068662,
                26.167538
              ],
              [
                -98.068651,
                26.16751
              ],
              [
                -98.068668,
                26.167484
              ],
              [
                -98.068694,
                26.167466
              ],
              [
                -98.068726,
                26.167466
              ],
              [
                -98.068755,
                26.167471
              ],
              [
                -98.068779,
                26.167487
              ],
              [
                -98.068789,
                26.167512
              ],
              [
                -98.068793,
                26.167539
              ],
              [
                -98.068777,
                26.167561
              ],
              [
                -98.068756,
                26.167581
              ],
              [
                -98.068726,
                26.16759
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-041",
          "cluster": "Northeast Perimeter Windbreak",
          "species": "Cedar Elm",
          "crown_radius_ft": 15.1,
          "crown_diameter_ft": 30.1,
          "area_sqft": 714,
          "est_height_ft": 22.7,
          "cooling_drop_f": 5.7,
          "carbon_storage_lbs": 179.9,
          "detection_confidence": 97.7,
          "spectral_vari_score": 0.586,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.068763,
                26.167462
              ],
              [
                -98.068744,
                26.167455
              ],
              [
                -98.068724,
                26.167448
              ],
              [
                -98.068721,
                26.167428
              ],
              [
                -98.068718,
                26.167411
              ],
              [
                -98.068729,
                26.167395
              ],
              [
                -98.068744,
                26.167384
              ],
              [
                -98.068763,
                26.167382
              ],
              [
                -98.068784,
                26.16738
              ],
              [
                -98.068802,
                26.167392
              ],
              [
                -98.06881,
                26.16741
              ],
              [
                -98.068805,
                26.167428
              ],
              [
                -98.068799,
                26.167445
              ],
              [
                -98.068783,
                26.167456
              ],
              [
                -98.068763,
                26.167462
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-042",
          "cluster": "Northeast Perimeter Windbreak",
          "species": "Cedar Elm",
          "crown_radius_ft": 22.7,
          "crown_diameter_ft": 45.4,
          "area_sqft": 1622,
          "est_height_ft": 36.7,
          "cooling_drop_f": 7.1,
          "carbon_storage_lbs": 379.3,
          "detection_confidence": 98.7,
          "spectral_vari_score": 0.655,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.068969,
                26.167482
              ],
              [
                -98.06894,
                26.167479
              ],
              [
                -98.068916,
                26.167462
              ],
              [
                -98.068904,
                26.167437
              ],
              [
                -98.068899,
                26.16741
              ],
              [
                -98.06892,
                26.167388
              ],
              [
                -98.068937,
                26.167364
              ],
              [
                -98.068969,
                26.167363
              ],
              [
                -98.068997,
                26.167373
              ],
              [
                -98.069027,
                26.167383
              ],
              [
                -98.069041,
                26.167409
              ],
              [
                -98.069043,
                26.167439
              ],
              [
                -98.069028,
                26.167466
              ],
              [
                -98.069001,
                26.167483
              ],
              [
                -98.068969,
                26.167482
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-043",
          "cluster": "Northeast Perimeter Windbreak",
          "species": "Cedar Elm",
          "crown_radius_ft": 22.2,
          "crown_diameter_ft": 44.4,
          "area_sqft": 1551,
          "est_height_ft": 34.5,
          "cooling_drop_f": 7.0,
          "carbon_storage_lbs": 359.8,
          "detection_confidence": 95.9,
          "spectral_vari_score": 0.454,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.068979,
                26.167608
              ],
              [
                -98.068948,
                26.167602
              ],
              [
                -98.068924,
                26.167584
              ],
              [
                -98.068908,
                26.167559
              ],
              [
                -98.068911,
                26.167531
              ],
              [
                -98.068922,
                26.167504
              ],
              [
                -98.068949,
                26.167488
              ],
              [
                -98.068979,
                26.167486
              ],
              [
                -98.069008,
                26.16749
              ],
              [
                -98.069033,
                26.167506
              ],
              [
                -98.069048,
                26.16753
              ],
              [
                -98.06904,
                26.167557
              ],
              [
                -98.06903,
                26.167581
              ],
              [
                -98.06901,
                26.167602
              ],
              [
                -98.068979,
                26.167608
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-044",
          "cluster": "Northeast Perimeter Windbreak",
          "species": "Anacua",
          "crown_radius_ft": 19.1,
          "crown_diameter_ft": 38.2,
          "area_sqft": 1147,
          "est_height_ft": 31.1,
          "cooling_drop_f": 6.5,
          "carbon_storage_lbs": 264.7,
          "detection_confidence": 96.7,
          "spectral_vari_score": 0.626,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.068625,
                26.167519
              ],
              [
                -98.0686,
                26.167511
              ],
              [
                -98.068577,
                26.167498
              ],
              [
                -98.068565,
                26.167476
              ],
              [
                -98.068569,
                26.167452
              ],
              [
                -98.068582,
                26.167433
              ],
              [
                -98.068597,
                26.167412
              ],
              [
                -98.068625,
                26.167414
              ],
              [
                -98.068652,
                26.167412
              ],
              [
                -98.068674,
                26.167429
              ],
              [
                -98.068684,
                26.167451
              ],
              [
                -98.068687,
                26.167476
              ],
              [
                -98.068674,
                26.167499
              ],
              [
                -98.068652,
                26.167513
              ],
              [
                -98.068625,
                26.167519
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-045",
          "cluster": "Northeast Perimeter Windbreak",
          "species": "Montezuma Cypress",
          "crown_radius_ft": 18.2,
          "crown_diameter_ft": 36.5,
          "area_sqft": 1044,
          "est_height_ft": 29.6,
          "cooling_drop_f": 6.3,
          "carbon_storage_lbs": 242.1,
          "detection_confidence": 95.7,
          "spectral_vari_score": 0.432,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.068833,
                26.167332
              ],
              [
                -98.068808,
                26.16733
              ],
              [
                -98.06879,
                26.167314
              ],
              [
                -98.068776,
                26.167295
              ],
              [
                -98.068778,
                26.167272
              ],
              [
                -98.068788,
                26.167251
              ],
              [
                -98.068806,
                26.167235
              ],
              [
                -98.068833,
                26.167235
              ],
              [
                -98.068857,
                26.167237
              ],
              [
                -98.068877,
                26.167251
              ],
              [
                -98.068888,
                26.167272
              ],
              [
                -98.068887,
                26.167294
              ],
              [
                -98.068878,
                26.167316
              ],
              [
                -98.068857,
                26.16733
              ],
              [
                -98.068833,
                26.167332
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-046",
          "cluster": "Northeast Perimeter Windbreak",
          "species": "Cedar Elm",
          "crown_radius_ft": 14.3,
          "crown_diameter_ft": 28.7,
          "area_sqft": 646,
          "est_height_ft": 24.9,
          "cooling_drop_f": 5.6,
          "carbon_storage_lbs": 152.4,
          "detection_confidence": 97.1,
          "spectral_vari_score": 0.667,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.068613,
                26.16733
              ],
              [
                -98.068594,
                26.167328
              ],
              [
                -98.068577,
                26.167317
              ],
              [
                -98.068567,
                26.167301
              ],
              [
                -98.068571,
                26.167283
              ],
              [
                -98.068577,
                26.167266
              ],
              [
                -98.068595,
                26.167258
              ],
              [
                -98.068613,
                26.167252
              ],
              [
                -98.068631,
                26.167258
              ],
              [
                -98.068647,
                26.167267
              ],
              [
                -98.068655,
                26.167283
              ],
              [
                -98.068659,
                26.167301
              ],
              [
                -98.068645,
                26.167314
              ],
              [
                -98.068632,
                26.167326
              ],
              [
                -98.068613,
                26.16733
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-047",
          "cluster": "Northeast Perimeter Windbreak",
          "species": "Montezuma Cypress",
          "crown_radius_ft": 20.9,
          "crown_diameter_ft": 41.8,
          "area_sqft": 1370,
          "est_height_ft": 33.8,
          "cooling_drop_f": 6.8,
          "carbon_storage_lbs": 320.4,
          "detection_confidence": 98.7,
          "spectral_vari_score": 0.564,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069041,
                26.167625
              ],
              [
                -98.069015,
                26.167622
              ],
              [
                -98.068987,
                26.167611
              ],
              [
                -98.068974,
                26.167586
              ],
              [
                -98.068975,
                26.167558
              ],
              [
                -98.068995,
                26.167539
              ],
              [
                -98.069015,
                26.167523
              ],
              [
                -98.069041,
                26.167513
              ],
              [
                -98.069071,
                26.167516
              ],
              [
                -98.069087,
                26.167539
              ],
              [
                -98.069102,
                26.167559
              ],
              [
                -98.069109,
                26.167586
              ],
              [
                -98.069094,
                26.16761
              ],
              [
                -98.069068,
                26.167621
              ],
              [
                -98.069041,
                26.167625
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-048",
          "cluster": "Northeast Perimeter Windbreak",
          "species": "Cedar Elm",
          "crown_radius_ft": 15.7,
          "crown_diameter_ft": 31.4,
          "area_sqft": 772,
          "est_height_ft": 26.3,
          "cooling_drop_f": 5.9,
          "carbon_storage_lbs": 188.0,
          "detection_confidence": 97.0,
          "spectral_vari_score": 0.45,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.0687,
                26.167521
              ],
              [
                -98.068678,
                26.167522
              ],
              [
                -98.06866,
                26.167509
              ],
              [
                -98.068653,
                26.167489
              ],
              [
                -98.068651,
                26.16747
              ],
              [
                -98.068666,
                26.167455
              ],
              [
                -98.068678,
                26.167438
              ],
              [
                -98.0687,
                26.167439
              ],
              [
                -98.068721,
                26.167442
              ],
              [
                -98.06874,
                26.167451
              ],
              [
                -98.068748,
                26.16747
              ],
              [
                -98.068743,
                26.167488
              ],
              [
                -98.068736,
                26.167505
              ],
              [
                -98.06872,
                26.167516
              ],
              [
                -98.0687,
                26.167521
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-049",
          "cluster": "Northeast Perimeter Windbreak",
          "species": "Montezuma Cypress",
          "crown_radius_ft": 17.2,
          "crown_diameter_ft": 34.3,
          "area_sqft": 925,
          "est_height_ft": 25.6,
          "cooling_drop_f": 6.1,
          "carbon_storage_lbs": 220.1,
          "detection_confidence": 95.5,
          "spectral_vari_score": 0.578,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.068875,
                26.167351
              ],
              [
                -98.068854,
                26.167339
              ],
              [
                -98.068831,
                26.167331
              ],
              [
                -98.06882,
                26.167312
              ],
              [
                -98.068823,
                26.16729
              ],
              [
                -98.068834,
                26.167271
              ],
              [
                -98.06885,
                26.167254
              ],
              [
                -98.068875,
                26.167257
              ],
              [
                -98.068897,
                26.167258
              ],
              [
                -98.068915,
                26.167271
              ],
              [
                -98.068928,
                26.167289
              ],
              [
                -98.068926,
                26.167311
              ],
              [
                -98.068919,
                26.167332
              ],
              [
                -98.068896,
                26.16734
              ],
              [
                -98.068875,
                26.167351
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-050",
          "cluster": "Northeast Perimeter Windbreak",
          "species": "Montezuma Cypress",
          "crown_radius_ft": 20.3,
          "crown_diameter_ft": 40.6,
          "area_sqft": 1292,
          "est_height_ft": 32.2,
          "cooling_drop_f": 6.7,
          "carbon_storage_lbs": 298.7,
          "detection_confidence": 96.9,
          "spectral_vari_score": 0.61,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.068957,
                26.167358
              ],
              [
                -98.068931,
                26.167349
              ],
              [
                -98.068909,
                26.167336
              ],
              [
                -98.068898,
                26.167313
              ],
              [
                -98.068894,
                26.167288
              ],
              [
                -98.068912,
                26.167269
              ],
              [
                -98.06893,
                26.167249
              ],
              [
                -98.068957,
                26.167242
              ],
              [
                -98.068985,
                26.16725
              ],
              [
                -98.069009,
                26.167264
              ],
              [
                -98.069017,
                26.167289
              ],
              [
                -98.069022,
                26.167314
              ],
              [
                -98.069005,
                26.167335
              ],
              [
                -98.068986,
                26.167354
              ],
              [
                -98.068957,
                26.167358
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-051",
          "cluster": "North Academic Courtyard",
          "species": "Live Oak",
          "crown_radius_ft": 14.3,
          "crown_diameter_ft": 28.6,
          "area_sqft": 642,
          "est_height_ft": 24.0,
          "cooling_drop_f": 5.6,
          "carbon_storage_lbs": 157.3,
          "detection_confidence": 99.0,
          "spectral_vari_score": 0.433,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.07004,
                26.166972
              ],
              [
                -98.070022,
                26.166969
              ],
              [
                -98.070006,
                26.16696
              ],
              [
                -98.069995,
                26.166945
              ],
              [
                -98.069998,
                26.166927
              ],
              [
                -98.070008,
                26.166913
              ],
              [
                -98.070022,
                26.166903
              ],
              [
                -98.07004,
                26.166893
              ],
              [
                -98.070059,
                26.1669
              ],
              [
                -98.070075,
                26.16691
              ],
              [
                -98.070082,
                26.166927
              ],
              [
                -98.070085,
                26.166945
              ],
              [
                -98.070076,
                26.166962
              ],
              [
                -98.070058,
                26.166971
              ],
              [
                -98.07004,
                26.166972
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-052",
          "cluster": "North Academic Courtyard",
          "species": "Cedar Elm",
          "crown_radius_ft": 12.9,
          "crown_diameter_ft": 25.9,
          "area_sqft": 525,
          "est_height_ft": 20.3,
          "cooling_drop_f": 5.4,
          "carbon_storage_lbs": 134.7,
          "detection_confidence": 98.7,
          "spectral_vari_score": 0.49,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.07004,
                26.166961
              ],
              [
                -98.070024,
                26.166957
              ],
              [
                -98.070007,
                26.166951
              ],
              [
                -98.070002,
                26.166935
              ],
              [
                -98.069999,
                26.166919
              ],
              [
                -98.070008,
                26.166905
              ],
              [
                -98.070021,
                26.166893
              ],
              [
                -98.07004,
                26.166889
              ],
              [
                -98.070058,
                26.166892
              ],
              [
                -98.070072,
                26.166904
              ],
              [
                -98.070079,
                26.166919
              ],
              [
                -98.070079,
                26.166935
              ],
              [
                -98.070068,
                26.166947
              ],
              [
                -98.070058,
                26.166962
              ],
              [
                -98.07004,
                26.166961
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-053",
          "cluster": "North Academic Courtyard",
          "species": "Texas Ebony",
          "crown_radius_ft": 14.8,
          "crown_diameter_ft": 29.6,
          "area_sqft": 686,
          "est_height_ft": 23.4,
          "cooling_drop_f": 5.7,
          "carbon_storage_lbs": 162.0,
          "detection_confidence": 98.9,
          "spectral_vari_score": 0.46,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069853,
                26.166928
              ],
              [
                -98.069833,
                26.166928
              ],
              [
                -98.069821,
                26.166914
              ],
              [
                -98.069807,
                26.1669
              ],
              [
                -98.069805,
                26.166881
              ],
              [
                -98.06982,
                26.166867
              ],
              [
                -98.069833,
                26.166854
              ],
              [
                -98.069853,
                26.166851
              ],
              [
                -98.069873,
                26.166854
              ],
              [
                -98.069886,
                26.166867
              ],
              [
                -98.069896,
                26.166882
              ],
              [
                -98.069896,
                26.166899
              ],
              [
                -98.069891,
                26.166918
              ],
              [
                -98.069873,
                26.166928
              ],
              [
                -98.069853,
                26.166928
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-054",
          "cluster": "North Academic Courtyard",
          "species": "Texas Ebony",
          "crown_radius_ft": 12.7,
          "crown_diameter_ft": 25.5,
          "area_sqft": 509,
          "est_height_ft": 21.8,
          "cooling_drop_f": 5.3,
          "carbon_storage_lbs": 128.2,
          "detection_confidence": 96.1,
          "spectral_vari_score": 0.456,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.070165,
                26.167122
              ],
              [
                -98.070149,
                26.167118
              ],
              [
                -98.070133,
                26.16711
              ],
              [
                -98.07013,
                26.167094
              ],
              [
                -98.070127,
                26.16708
              ],
              [
                -98.070136,
                26.167066
              ],
              [
                -98.070148,
                26.167055
              ],
              [
                -98.070165,
                26.167052
              ],
              [
                -98.070182,
                26.167055
              ],
              [
                -98.070193,
                26.167067
              ],
              [
                -98.070202,
                26.16708
              ],
              [
                -98.070204,
                26.167095
              ],
              [
                -98.070193,
                26.167107
              ],
              [
                -98.070181,
                26.167118
              ],
              [
                -98.070165,
                26.167122
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-055",
          "cluster": "North Academic Courtyard",
          "species": "Cedar Elm",
          "crown_radius_ft": 12.1,
          "crown_diameter_ft": 24.1,
          "area_sqft": 458,
          "est_height_ft": 20.0,
          "cooling_drop_f": 5.2,
          "carbon_storage_lbs": 111.0,
          "detection_confidence": 96.4,
          "spectral_vari_score": 0.525,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.070032,
                26.16695
              ],
              [
                -98.070017,
                26.166945
              ],
              [
                -98.070003,
                26.166937
              ],
              [
                -98.069995,
                26.166924
              ],
              [
                -98.069997,
                26.166909
              ],
              [
                -98.070004,
                26.166896
              ],
              [
                -98.070015,
                26.166885
              ],
              [
                -98.070032,
                26.166883
              ],
              [
                -98.070048,
                26.166886
              ],
              [
                -98.070059,
                26.166897
              ],
              [
                -98.070067,
                26.166909
              ],
              [
                -98.070068,
                26.166923
              ],
              [
                -98.070061,
                26.166937
              ],
              [
                -98.070049,
                26.166947
              ],
              [
                -98.070032,
                26.16695
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-056",
          "cluster": "North Academic Courtyard",
          "species": "Texas Ebony",
          "crown_radius_ft": 20.5,
          "crown_diameter_ft": 41.1,
          "area_sqft": 1324,
          "est_height_ft": 33.0,
          "cooling_drop_f": 6.7,
          "carbon_storage_lbs": 314.9,
          "detection_confidence": 96.7,
          "spectral_vari_score": 0.609,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.070107,
                26.167212
              ],
              [
                -98.070078,
                26.167214
              ],
              [
                -98.07006,
                26.167193
              ],
              [
                -98.070044,
                26.167173
              ],
              [
                -98.070045,
                26.167147
              ],
              [
                -98.070058,
                26.167125
              ],
              [
                -98.07008,
                26.167111
              ],
              [
                -98.070107,
                26.167105
              ],
              [
                -98.070133,
                26.167111
              ],
              [
                -98.070153,
                26.167127
              ],
              [
                -98.070168,
                26.167147
              ],
              [
                -98.070164,
                26.167172
              ],
              [
                -98.070156,
                26.167195
              ],
              [
                -98.070136,
                26.167214
              ],
              [
                -98.070107,
                26.167212
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-057",
          "cluster": "North Academic Courtyard",
          "species": "Live Oak",
          "crown_radius_ft": 14.1,
          "crown_diameter_ft": 28.3,
          "area_sqft": 627,
          "est_height_ft": 22.1,
          "cooling_drop_f": 5.6,
          "carbon_storage_lbs": 148.9,
          "detection_confidence": 96.5,
          "spectral_vari_score": 0.534,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.0698,
                26.167146
              ],
              [
                -98.06978,
                26.167146
              ],
              [
                -98.069768,
                26.167132
              ],
              [
                -98.069754,
                26.167119
              ],
              [
                -98.069756,
                26.167101
              ],
              [
                -98.069766,
                26.167085
              ],
              [
                -98.069781,
                26.167074
              ],
              [
                -98.0698,
                26.16707
              ],
              [
                -98.069819,
                26.167073
              ],
              [
                -98.069836,
                26.167083
              ],
              [
                -98.069843,
                26.1671
              ],
              [
                -98.069845,
                26.167119
              ],
              [
                -98.069832,
                26.167133
              ],
              [
                -98.06982,
                26.167147
              ],
              [
                -98.0698,
                26.167146
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-058",
          "cluster": "North Academic Courtyard",
          "species": "Cedar Elm",
          "crown_radius_ft": 19.2,
          "crown_diameter_ft": 38.3,
          "area_sqft": 1154,
          "est_height_ft": 28.1,
          "cooling_drop_f": 6.5,
          "carbon_storage_lbs": 270.5,
          "detection_confidence": 98.6,
          "spectral_vari_score": 0.589,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069887,
                26.16704
              ],
              [
                -98.069862,
                26.167036
              ],
              [
                -98.069845,
                26.16702
              ],
              [
                -98.069827,
                26.167002
              ],
              [
                -98.069834,
                26.166979
              ],
              [
                -98.069838,
                26.166954
              ],
              [
                -98.06986,
                26.166939
              ],
              [
                -98.069887,
                26.166936
              ],
              [
                -98.069913,
                26.166942
              ],
              [
                -98.069933,
                26.166957
              ],
              [
                -98.069945,
                26.166977
              ],
              [
                -98.069948,
                26.167002
              ],
              [
                -98.069936,
                26.167025
              ],
              [
                -98.069913,
                26.167036
              ],
              [
                -98.069887,
                26.16704
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-059",
          "cluster": "North Academic Courtyard",
          "species": "Live Oak",
          "crown_radius_ft": 13.4,
          "crown_diameter_ft": 26.7,
          "area_sqft": 561,
          "est_height_ft": 21.8,
          "cooling_drop_f": 5.4,
          "carbon_storage_lbs": 145.2,
          "detection_confidence": 95.4,
          "spectral_vari_score": 0.584,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069962,
                26.166978
              ],
              [
                -98.069942,
                26.166975
              ],
              [
                -98.069932,
                26.16696
              ],
              [
                -98.069921,
                26.166947
              ],
              [
                -98.069925,
                26.166931
              ],
              [
                -98.069928,
                26.166915
              ],
              [
                -98.069942,
                26.166903
              ],
              [
                -98.069962,
                26.166902
              ],
              [
                -98.06998,
                26.166905
              ],
              [
                -98.069993,
                26.166916
              ],
              [
                -98.070005,
                26.16693
              ],
              [
                -98.070001,
                26.166947
              ],
              [
                -98.069995,
                26.166963
              ],
              [
                -98.06998,
                26.166973
              ],
              [
                -98.069962,
                26.166978
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-060",
          "cluster": "North Academic Courtyard",
          "species": "Texas Ebony",
          "crown_radius_ft": 17.0,
          "crown_diameter_ft": 34.0,
          "area_sqft": 910,
          "est_height_ft": 26.1,
          "cooling_drop_f": 6.1,
          "carbon_storage_lbs": 220.5,
          "detection_confidence": 98.5,
          "spectral_vari_score": 0.631,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.070031,
                26.166991
              ],
              [
                -98.070007,
                26.166989
              ],
              [
                -98.069988,
                26.166974
              ],
              [
                -98.069982,
                26.166953
              ],
              [
                -98.06998,
                26.166933
              ],
              [
                -98.069993,
                26.166916
              ],
              [
                -98.070009,
                26.166902
              ],
              [
                -98.070031,
                26.166893
              ],
              [
                -98.070055,
                26.1669
              ],
              [
                -98.070071,
                26.166915
              ],
              [
                -98.070083,
                26.166933
              ],
              [
                -98.070086,
                26.166955
              ],
              [
                -98.070071,
                26.166971
              ],
              [
                -98.070053,
                26.166985
              ],
              [
                -98.070031,
                26.166991
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-061",
          "cluster": "North Academic Courtyard",
          "species": "Cedar Elm",
          "crown_radius_ft": 18.6,
          "crown_diameter_ft": 37.3,
          "area_sqft": 1093,
          "est_height_ft": 30.8,
          "cooling_drop_f": 6.4,
          "carbon_storage_lbs": 250.0,
          "detection_confidence": 98.3,
          "spectral_vari_score": 0.557,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069793,
                26.167111
              ],
              [
                -98.069768,
                26.167105
              ],
              [
                -98.069752,
                26.167088
              ],
              [
                -98.069739,
                26.167069
              ],
              [
                -98.069733,
                26.167046
              ],
              [
                -98.069749,
                26.167027
              ],
              [
                -98.069767,
                26.16701
              ],
              [
                -98.069793,
                26.16701
              ],
              [
                -98.06982,
                26.167008
              ],
              [
                -98.069835,
                26.167028
              ],
              [
                -98.069847,
                26.167047
              ],
              [
                -98.069852,
                26.16707
              ],
              [
                -98.069838,
                26.16709
              ],
              [
                -98.069818,
                26.167105
              ],
              [
                -98.069793,
                26.167111
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-062",
          "cluster": "West Primary Play Shade Grove",
          "species": "Desert Willow",
          "crown_radius_ft": 16.3,
          "crown_diameter_ft": 32.5,
          "area_sqft": 830,
          "est_height_ft": 25.4,
          "cooling_drop_f": 6.0,
          "carbon_storage_lbs": 193.4,
          "detection_confidence": 98.6,
          "spectral_vari_score": 0.542,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.07032,
                26.166943
              ],
              [
                -98.070298,
                26.166938
              ],
              [
                -98.070279,
                26.166925
              ],
              [
                -98.070275,
                26.166905
              ],
              [
                -98.070272,
                26.166886
              ],
              [
                -98.070282,
                26.166868
              ],
              [
                -98.070298,
                26.166854
              ],
              [
                -98.07032,
                26.166853
              ],
              [
                -98.070342,
                26.166856
              ],
              [
                -98.070358,
                26.166869
              ],
              [
                -98.070371,
                26.166885
              ],
              [
                -98.070368,
                26.166905
              ],
              [
                -98.070359,
                26.166924
              ],
              [
                -98.070341,
                26.166934
              ],
              [
                -98.07032,
                26.166943
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-063",
          "cluster": "West Primary Play Shade Grove",
          "species": "Anacua",
          "crown_radius_ft": 19.1,
          "crown_diameter_ft": 38.1,
          "area_sqft": 1140,
          "est_height_ft": 29.6,
          "cooling_drop_f": 6.5,
          "carbon_storage_lbs": 263.6,
          "detection_confidence": 98.4,
          "spectral_vari_score": 0.491,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.070563,
                26.167006
              ],
              [
                -98.070538,
                26.167002
              ],
              [
                -98.070514,
                26.16699
              ],
              [
                -98.070503,
                26.166967
              ],
              [
                -98.070503,
                26.166943
              ],
              [
                -98.07052,
                26.166924
              ],
              [
                -98.070539,
                26.16691
              ],
              [
                -98.070563,
                26.166901
              ],
              [
                -98.07059,
                26.166905
              ],
              [
                -98.070609,
                26.166922
              ],
              [
                -98.070616,
                26.166944
              ],
              [
                -98.070624,
                26.166967
              ],
              [
                -98.070612,
                26.16699
              ],
              [
                -98.070587,
                26.167
              ],
              [
                -98.070563,
                26.167006
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-064",
          "cluster": "West Primary Play Shade Grove",
          "species": "Honey Mesquite",
          "crown_radius_ft": 14.7,
          "crown_diameter_ft": 29.4,
          "area_sqft": 681,
          "est_height_ft": 25.1,
          "cooling_drop_f": 5.7,
          "carbon_storage_lbs": 172.9,
          "detection_confidence": 97.2,
          "spectral_vari_score": 0.636,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.070668,
                26.167023
              ],
              [
                -98.070649,
                26.167015
              ],
              [
                -98.070634,
                26.167004
              ],
              [
                -98.070625,
                26.166988
              ],
              [
                -98.070625,
                26.16697
              ],
              [
                -98.070636,
                26.166956
              ],
              [
                -98.07065,
                26.166944
              ],
              [
                -98.070668,
                26.16694
              ],
              [
                -98.070687,
                26.166945
              ],
              [
                -98.070705,
                26.166953
              ],
              [
                -98.070711,
                26.16697
              ],
              [
                -98.07071,
                26.166987
              ],
              [
                -98.070701,
                26.167002
              ],
              [
                -98.070689,
                26.167018
              ],
              [
                -98.070668,
                26.167023
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-065",
          "cluster": "West Primary Play Shade Grove",
          "species": "Honey Mesquite",
          "crown_radius_ft": 16.2,
          "crown_diameter_ft": 32.5,
          "area_sqft": 828,
          "est_height_ft": 24.0,
          "cooling_drop_f": 6.0,
          "carbon_storage_lbs": 193.8,
          "detection_confidence": 97.9,
          "spectral_vari_score": 0.57,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.070515,
                26.166971
              ],
              [
                -98.070491,
                26.166972
              ],
              [
                -98.070475,
                26.166957
              ],
              [
                -98.070467,
                26.166939
              ],
              [
                -98.070464,
                26.166918
              ],
              [
                -98.070478,
                26.166902
              ],
              [
                -98.070495,
                26.166891
              ],
              [
                -98.070515,
                26.166886
              ],
              [
                -98.070537,
                26.166888
              ],
              [
                -98.070554,
                26.1669
              ],
              [
                -98.070559,
                26.16692
              ],
              [
                -98.070566,
                26.166939
              ],
              [
                -98.070554,
                26.166957
              ],
              [
                -98.070536,
                26.166969
              ],
              [
                -98.070515,
                26.166971
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-066",
          "cluster": "West Primary Play Shade Grove",
          "species": "Anacua",
          "crown_radius_ft": 11.0,
          "crown_diameter_ft": 22.0,
          "area_sqft": 381,
          "est_height_ft": 17.8,
          "cooling_drop_f": 5.0,
          "carbon_storage_lbs": 98.9,
          "detection_confidence": 98.5,
          "spectral_vari_score": 0.51,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.0706,
                26.166946
              ],
              [
                -98.070586,
                26.16694
              ],
              [
                -98.070571,
                26.166935
              ],
              [
                -98.070569,
                26.166921
              ],
              [
                -98.070567,
                26.166908
              ],
              [
                -98.070573,
                26.166896
              ],
              [
                -98.070584,
                26.166885
              ],
              [
                -98.0706,
                26.166884
              ],
              [
                -98.070614,
                26.166888
              ],
              [
                -98.070626,
                26.166896
              ],
              [
                -98.070633,
                26.166908
              ],
              [
                -98.070635,
                26.166922
              ],
              [
                -98.070625,
                26.166933
              ],
              [
                -98.070613,
                26.16694
              ],
              [
                -98.0706,
                26.166946
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-067",
          "cluster": "West Primary Play Shade Grove",
          "species": "Desert Willow",
          "crown_radius_ft": 17.6,
          "crown_diameter_ft": 35.1,
          "area_sqft": 968,
          "est_height_ft": 28.7,
          "cooling_drop_f": 6.2,
          "carbon_storage_lbs": 223.2,
          "detection_confidence": 98.9,
          "spectral_vari_score": 0.502,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.070439,
                26.166967
              ],
              [
                -98.070416,
                26.166962
              ],
              [
                -98.070396,
                26.166951
              ],
              [
                -98.070383,
                26.166931
              ],
              [
                -98.070385,
                26.166909
              ],
              [
                -98.070393,
                26.166887
              ],
              [
                -98.070415,
                26.166877
              ],
              [
                -98.070439,
                26.166874
              ],
              [
                -98.070461,
                26.166879
              ],
              [
                -98.070482,
                26.166889
              ],
              [
                -98.070495,
                26.166908
              ],
              [
                -98.070487,
                26.16693
              ],
              [
                -98.070479,
                26.166948
              ],
              [
                -98.070463,
                26.166966
              ],
              [
                -98.070439,
                26.166967
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-068",
          "cluster": "West Primary Play Shade Grove",
          "species": "Anacua",
          "crown_radius_ft": 17.9,
          "crown_diameter_ft": 35.9,
          "area_sqft": 1010,
          "est_height_ft": 27.2,
          "cooling_drop_f": 6.3,
          "carbon_storage_lbs": 243.0,
          "detection_confidence": 99.1,
          "spectral_vari_score": 0.555,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.070549,
                26.166821
              ],
              [
                -98.070525,
                26.166818
              ],
              [
                -98.070503,
                26.166807
              ],
              [
                -98.070492,
                26.166787
              ],
              [
                -98.070497,
                26.166764
              ],
              [
                -98.070509,
                26.166746
              ],
              [
                -98.070525,
                26.166731
              ],
              [
                -98.070549,
                26.166722
              ],
              [
                -98.070573,
                26.166728
              ],
              [
                -98.070595,
                26.166742
              ],
              [
                -98.070601,
                26.166764
              ],
              [
                -98.070607,
                26.166787
              ],
              [
                -98.070592,
                26.166806
              ],
              [
                -98.070572,
                26.166819
              ],
              [
                -98.070549,
                26.166821
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-069",
          "cluster": "West Primary Play Shade Grove",
          "species": "Desert Willow",
          "crown_radius_ft": 11.7,
          "crown_diameter_ft": 23.3,
          "area_sqft": 428,
          "est_height_ft": 21.7,
          "cooling_drop_f": 5.1,
          "carbon_storage_lbs": 105.2,
          "detection_confidence": 98.5,
          "spectral_vari_score": 0.435,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.070392,
                26.166974
              ],
              [
                -98.070377,
                26.16697
              ],
              [
                -98.070364,
                26.166963
              ],
              [
                -98.070358,
                26.16695
              ],
              [
                -98.070357,
                26.166936
              ],
              [
                -98.070362,
                26.166922
              ],
              [
                -98.070377,
                26.166916
              ],
              [
                -98.070392,
                26.166911
              ],
              [
                -98.070407,
                26.166915
              ],
              [
                -98.070421,
                26.166922
              ],
              [
                -98.070429,
                26.166936
              ],
              [
                -98.070427,
                26.166951
              ],
              [
                -98.070419,
                26.166963
              ],
              [
                -98.070407,
                26.166973
              ],
              [
                -98.070392,
                26.166974
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-070",
          "cluster": "West Primary Play Shade Grove",
          "species": "Desert Willow",
          "crown_radius_ft": 15.4,
          "crown_diameter_ft": 30.7,
          "area_sqft": 741,
          "est_height_ft": 25.5,
          "cooling_drop_f": 5.8,
          "carbon_storage_lbs": 187.2,
          "detection_confidence": 97.6,
          "spectral_vari_score": 0.558,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.070545,
                26.166938
              ],
              [
                -98.070524,
                26.166938
              ],
              [
                -98.070506,
                26.166926
              ],
              [
                -98.070503,
                26.166907
              ],
              [
                -98.070502,
                26.16689
              ],
              [
                -98.070506,
                26.166871
              ],
              [
                -98.070525,
                26.166862
              ],
              [
                -98.070545,
                26.166857
              ],
              [
                -98.070565,
                26.16686
              ],
              [
                -98.070582,
                26.166872
              ],
              [
                -98.070592,
                26.166889
              ],
              [
                -98.070594,
                26.166909
              ],
              [
                -98.070581,
                26.166924
              ],
              [
                -98.070566,
                26.166939
              ],
              [
                -98.070545,
                26.166938
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-071",
          "cluster": "Southeast Bus Loop & Entrance Buffer",
          "species": "Live Oak",
          "crown_radius_ft": 16.0,
          "crown_diameter_ft": 32.0,
          "area_sqft": 804,
          "est_height_ft": 23.7,
          "cooling_drop_f": 5.9,
          "carbon_storage_lbs": 188.0,
          "detection_confidence": 99.4,
          "spectral_vari_score": 0.631,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069079,
                26.166189
              ],
              [
                -98.069056,
                26.166188
              ],
              [
                -98.069043,
                26.166171
              ],
              [
                -98.069028,
                26.166155
              ],
              [
                -98.069029,
                26.166135
              ],
              [
                -98.069042,
                26.166119
              ],
              [
                -98.069057,
                26.166105
              ],
              [
                -98.069079,
                26.1661
              ],
              [
                -98.069102,
                26.166102
              ],
              [
                -98.069115,
                26.166119
              ],
              [
                -98.069123,
                26.166136
              ],
              [
                -98.069123,
                26.166154
              ],
              [
                -98.069115,
                26.166171
              ],
              [
                -98.069101,
                26.166186
              ],
              [
                -98.069079,
                26.166189
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-072",
          "cluster": "Southeast Bus Loop & Entrance Buffer",
          "species": "Huisache",
          "crown_radius_ft": 21.0,
          "crown_diameter_ft": 42.0,
          "area_sqft": 1387,
          "est_height_ft": 30.6,
          "cooling_drop_f": 6.8,
          "carbon_storage_lbs": 322.4,
          "detection_confidence": 98.6,
          "spectral_vari_score": 0.563,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.068918,
                26.166402
              ],
              [
                -98.068888,
                26.166396
              ],
              [
                -98.068865,
                26.166378
              ],
              [
                -98.06885,
                26.166354
              ],
              [
                -98.068853,
                26.166327
              ],
              [
                -98.068865,
                26.166302
              ],
              [
                -98.06889,
                26.166288
              ],
              [
                -98.068918,
                26.166286
              ],
              [
                -98.068944,
                26.166291
              ],
              [
                -98.068965,
                26.166307
              ],
              [
                -98.068984,
                26.166327
              ],
              [
                -98.068975,
                26.166352
              ],
              [
                -98.068968,
                26.166377
              ],
              [
                -98.068945,
                26.166391
              ],
              [
                -98.068918,
                26.166402
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-073",
          "cluster": "Southeast Bus Loop & Entrance Buffer",
          "species": "Huisache",
          "crown_radius_ft": 16.7,
          "crown_diameter_ft": 33.4,
          "area_sqft": 877,
          "est_height_ft": 27.4,
          "cooling_drop_f": 6.0,
          "carbon_storage_lbs": 209.9,
          "detection_confidence": 99.0,
          "spectral_vari_score": 0.434,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069348,
                26.166267
              ],
              [
                -98.069324,
                26.166262
              ],
              [
                -98.069311,
                26.166245
              ],
              [
                -98.069293,
                26.166229
              ],
              [
                -98.069296,
                26.166208
              ],
              [
                -98.069308,
                26.16619
              ],
              [
                -98.069325,
                26.166176
              ],
              [
                -98.069348,
                26.166174
              ],
              [
                -98.069371,
                26.166174
              ],
              [
                -98.06939,
                26.166188
              ],
              [
                -98.069399,
                26.166208
              ],
              [
                -98.069395,
                26.166228
              ],
              [
                -98.069391,
                26.166249
              ],
              [
                -98.06937,
                26.166259
              ],
              [
                -98.069348,
                26.166267
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-074",
          "cluster": "Southeast Bus Loop & Entrance Buffer",
          "species": "Cedar Elm",
          "crown_radius_ft": 15.0,
          "crown_diameter_ft": 30.0,
          "area_sqft": 705,
          "est_height_ft": 26.0,
          "cooling_drop_f": 5.7,
          "carbon_storage_lbs": 166.9,
          "detection_confidence": 97.8,
          "spectral_vari_score": 0.655,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069316,
                26.166096
              ],
              [
                -98.069296,
                26.166088
              ],
              [
                -98.069281,
                26.166076
              ],
              [
                -98.069274,
                26.16606
              ],
              [
                -98.069273,
                26.166042
              ],
              [
                -98.069277,
                26.166023
              ],
              [
                -98.069297,
                26.166016
              ],
              [
                -98.069316,
                26.166009
              ],
              [
                -98.069336,
                26.166013
              ],
              [
                -98.069349,
                26.166027
              ],
              [
                -98.069362,
                26.166042
              ],
              [
                -98.069361,
                26.16606
              ],
              [
                -98.069352,
                26.166077
              ],
              [
                -98.069334,
                26.166086
              ],
              [
                -98.069316,
                26.166096
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-075",
          "cluster": "Southeast Bus Loop & Entrance Buffer",
          "species": "Live Oak",
          "crown_radius_ft": 13.5,
          "crown_diameter_ft": 27.0,
          "area_sqft": 572,
          "est_height_ft": 20.5,
          "cooling_drop_f": 5.5,
          "carbon_storage_lbs": 150.0,
          "detection_confidence": 98.1,
          "spectral_vari_score": 0.461,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.068948,
                26.166163
              ],
              [
                -98.06893,
                26.166156
              ],
              [
                -98.068917,
                26.166146
              ],
              [
                -98.068907,
                26.166133
              ],
              [
                -98.068906,
                26.166116
              ],
              [
                -98.068918,
                26.166103
              ],
              [
                -98.068928,
                26.166089
              ],
              [
                -98.068948,
                26.166087
              ],
              [
                -98.068966,
                26.16609
              ],
              [
                -98.068979,
                26.166102
              ],
              [
                -98.068986,
                26.166116
              ],
              [
                -98.06899,
                26.166133
              ],
              [
                -98.068979,
                26.166147
              ],
              [
                -98.068965,
                26.166157
              ],
              [
                -98.068948,
                26.166163
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-076",
          "cluster": "Southeast Bus Loop & Entrance Buffer",
          "species": "Live Oak",
          "crown_radius_ft": 17.1,
          "crown_diameter_ft": 34.2,
          "area_sqft": 917,
          "est_height_ft": 26.3,
          "cooling_drop_f": 6.1,
          "carbon_storage_lbs": 222.0,
          "detection_confidence": 96.2,
          "spectral_vari_score": 0.645,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069167,
                26.1662
              ],
              [
                -98.069143,
                26.166196
              ],
              [
                -98.069123,
                26.166183
              ],
              [
                -98.069119,
                26.166161
              ],
              [
                -98.069117,
                26.166141
              ],
              [
                -98.069126,
                26.166121
              ],
              [
                -98.069145,
                26.16611
              ],
              [
                -98.069167,
                26.166104
              ],
              [
                -98.069189,
                26.166111
              ],
              [
                -98.069206,
                26.166123
              ],
              [
                -98.069214,
                26.166141
              ],
              [
                -98.069216,
                26.166161
              ],
              [
                -98.069207,
                26.16618
              ],
              [
                -98.06919,
                26.166194
              ],
              [
                -98.069167,
                26.1662
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-077",
          "cluster": "Southeast Bus Loop & Entrance Buffer",
          "species": "Cedar Elm",
          "crown_radius_ft": 19.9,
          "crown_diameter_ft": 39.9,
          "area_sqft": 1248,
          "est_height_ft": 29.7,
          "cooling_drop_f": 6.6,
          "carbon_storage_lbs": 285.3,
          "detection_confidence": 96.4,
          "spectral_vari_score": 0.422,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069232,
                26.166123
              ],
              [
                -98.069206,
                26.166112
              ],
              [
                -98.069181,
                26.1661
              ],
              [
                -98.069173,
                26.166076
              ],
              [
                -98.069177,
                26.166052
              ],
              [
                -98.069186,
                26.16603
              ],
              [
                -98.069206,
                26.166014
              ],
              [
                -98.069232,
                26.166011
              ],
              [
                -98.069259,
                26.166013
              ],
              [
                -98.069276,
                26.166032
              ],
              [
                -98.06929,
                26.166052
              ],
              [
                -98.069293,
                26.166076
              ],
              [
                -98.069283,
                26.1661
              ],
              [
                -98.06926,
                26.166114
              ],
              [
                -98.069232,
                26.166123
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-078",
          "cluster": "Southeast Bus Loop & Entrance Buffer",
          "species": "Cedar Elm",
          "crown_radius_ft": 16.2,
          "crown_diameter_ft": 32.3,
          "area_sqft": 822,
          "est_height_ft": 26.9,
          "cooling_drop_f": 5.9,
          "carbon_storage_lbs": 195.1,
          "detection_confidence": 96.6,
          "spectral_vari_score": 0.664,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069325,
                26.166089
              ],
              [
                -98.069303,
                26.166086
              ],
              [
                -98.069288,
                26.166072
              ],
              [
                -98.069276,
                26.166055
              ],
              [
                -98.06928,
                26.166036
              ],
              [
                -98.069286,
                26.166018
              ],
              [
                -98.069302,
                26.166003
              ],
              [
                -98.069325,
                26.166003
              ],
              [
                -98.069348,
                26.166002
              ],
              [
                -98.069365,
                26.166017
              ],
              [
                -98.06937,
                26.166036
              ],
              [
                -98.069377,
                26.166056
              ],
              [
                -98.069363,
                26.166073
              ],
              [
                -98.069347,
                26.166088
              ],
              [
                -98.069325,
                26.166089
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-079",
          "cluster": "Southeast Bus Loop & Entrance Buffer",
          "species": "Huisache",
          "crown_radius_ft": 19.1,
          "crown_diameter_ft": 38.2,
          "area_sqft": 1147,
          "est_height_ft": 28.0,
          "cooling_drop_f": 6.5,
          "carbon_storage_lbs": 261.0,
          "detection_confidence": 97.3,
          "spectral_vari_score": 0.566,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069294,
                26.166322
              ],
              [
                -98.069267,
                26.166317
              ],
              [
                -98.069248,
                26.1663
              ],
              [
                -98.06924,
                26.166278
              ],
              [
                -98.069233,
                26.166255
              ],
              [
                -98.069251,
                26.166237
              ],
              [
                -98.069266,
                26.166216
              ],
              [
                -98.069294,
                26.166217
              ],
              [
                -98.069319,
                26.166221
              ],
              [
                -98.06934,
                26.166234
              ],
              [
                -98.069354,
                26.166255
              ],
              [
                -98.069352,
                26.166279
              ],
              [
                -98.06934,
                26.1663
              ],
              [
                -98.069319,
                26.166315
              ],
              [
                -98.069294,
                26.166322
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-080",
          "cluster": "Southeast Bus Loop & Entrance Buffer",
          "species": "Live Oak",
          "crown_radius_ft": 17.0,
          "crown_diameter_ft": 33.9,
          "area_sqft": 905,
          "est_height_ft": 28.8,
          "cooling_drop_f": 6.1,
          "carbon_storage_lbs": 217.0,
          "detection_confidence": 98.7,
          "spectral_vari_score": 0.458,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069381,
                26.166221
              ],
              [
                -98.069357,
                26.166215
              ],
              [
                -98.069339,
                26.166201
              ],
              [
                -98.069334,
                26.166181
              ],
              [
                -98.06933,
                26.166161
              ],
              [
                -98.069337,
                26.16614
              ],
              [
                -98.069357,
                26.166127
              ],
              [
                -98.069381,
                26.166122
              ],
              [
                -98.069404,
                26.166129
              ],
              [
                -98.069423,
                26.166141
              ],
              [
                -98.069432,
                26.166161
              ],
              [
                -98.069429,
                26.166181
              ],
              [
                -98.069422,
                26.166201
              ],
              [
                -98.069404,
                26.166214
              ],
              [
                -98.069381,
                26.166221
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-081",
          "cluster": "Southeast Bus Loop & Entrance Buffer",
          "species": "Live Oak",
          "crown_radius_ft": 24.4,
          "crown_diameter_ft": 48.8,
          "area_sqft": 1867,
          "est_height_ft": 35.7,
          "cooling_drop_f": 7.4,
          "carbon_storage_lbs": 426.2,
          "detection_confidence": 99.2,
          "spectral_vari_score": 0.54,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069374,
                26.166308
              ],
              [
                -98.069342,
                26.166301
              ],
              [
                -98.069318,
                26.166282
              ],
              [
                -98.069301,
                26.166257
              ],
              [
                -98.069299,
                26.166227
              ],
              [
                -98.069316,
                26.1662
              ],
              [
                -98.069339,
                26.166178
              ],
              [
                -98.069374,
                26.166172
              ],
              [
                -98.069407,
                26.166179
              ],
              [
                -98.069432,
                26.1662
              ],
              [
                -98.069447,
                26.166227
              ],
              [
                -98.069453,
                26.166258
              ],
              [
                -98.069432,
                26.166284
              ],
              [
                -98.069405,
                26.166301
              ],
              [
                -98.069374,
                26.166308
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-082",
          "cluster": "Southeast Bus Loop & Entrance Buffer",
          "species": "Huisache",
          "crown_radius_ft": 21.1,
          "crown_diameter_ft": 42.2,
          "area_sqft": 1400,
          "est_height_ft": 33.2,
          "cooling_drop_f": 6.8,
          "carbon_storage_lbs": 329.7,
          "detection_confidence": 98.2,
          "spectral_vari_score": 0.495,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069128,
                26.166247
              ],
              [
                -98.0691,
                26.166244
              ],
              [
                -98.069073,
                26.166231
              ],
              [
                -98.069067,
                26.166204
              ],
              [
                -98.069067,
                26.166179
              ],
              [
                -98.069073,
                26.166152
              ],
              [
                -98.069097,
                26.166135
              ],
              [
                -98.069128,
                26.16613
              ],
              [
                -98.069157,
                26.166137
              ],
              [
                -98.06918,
                26.166154
              ],
              [
                -98.069191,
                26.166178
              ],
              [
                -98.069191,
                26.166204
              ],
              [
                -98.069179,
                26.166228
              ],
              [
                -98.069158,
                26.166248
              ],
              [
                -98.069128,
                26.166247
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-083",
          "cluster": "Southeast Bus Loop & Entrance Buffer",
          "species": "Cedar Elm",
          "crown_radius_ft": 23.7,
          "crown_diameter_ft": 47.5,
          "area_sqft": 1772,
          "est_height_ft": 37.3,
          "cooling_drop_f": 7.3,
          "carbon_storage_lbs": 414.1,
          "detection_confidence": 97.7,
          "spectral_vari_score": 0.483,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069129,
                26.166274
              ],
              [
                -98.069099,
                26.166262
              ],
              [
                -98.069075,
                26.166244
              ],
              [
                -98.069056,
                26.16622
              ],
              [
                -98.06906,
                26.166191
              ],
              [
                -98.069073,
                26.166165
              ],
              [
                -98.069099,
                26.166149
              ],
              [
                -98.069129,
                26.16614
              ],
              [
                -98.069159,
                26.16615
              ],
              [
                -98.069187,
                26.166164
              ],
              [
                -98.069206,
                26.16619
              ],
              [
                -98.069203,
                26.16622
              ],
              [
                -98.069183,
                26.166243
              ],
              [
                -98.069162,
                26.166265
              ],
              [
                -98.069129,
                26.166274
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-084",
          "cluster": "Southeast Bus Loop & Entrance Buffer",
          "species": "Live Oak",
          "crown_radius_ft": 20.7,
          "crown_diameter_ft": 41.3,
          "area_sqft": 1340,
          "est_height_ft": 30.3,
          "cooling_drop_f": 6.8,
          "carbon_storage_lbs": 308.4,
          "detection_confidence": 98.4,
          "spectral_vari_score": 0.59,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.069135,
                26.166295
              ],
              [
                -98.069107,
                26.166291
              ],
              [
                -98.069089,
                26.166271
              ],
              [
                -98.069068,
                26.166252
              ],
              [
                -98.069068,
                26.166225
              ],
              [
                -98.069089,
                26.166205
              ],
              [
                -98.069107,
                26.166186
              ],
              [
                -98.069135,
                26.166178
              ],
              [
                -98.069163,
                26.166187
              ],
              [
                -98.069186,
                26.166202
              ],
              [
                -98.0692,
                26.166225
              ],
              [
                -98.069195,
                26.16625
              ],
              [
                -98.069183,
                26.166272
              ],
              [
                -98.06916,
                26.166285
              ],
              [
                -98.069135,
                26.166295
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-085",
          "cluster": "Central Kindergarten Learning Garden",
          "species": "Anacua",
          "crown_radius_ft": 16.7,
          "crown_diameter_ft": 33.5,
          "area_sqft": 879,
          "est_height_ft": 28.2,
          "cooling_drop_f": 6.0,
          "carbon_storage_lbs": 204.4,
          "detection_confidence": 96.4,
          "spectral_vari_score": 0.677,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.070036,
                26.166577
              ],
              [
                -98.070015,
                26.166567
              ],
              [
                -98.069993,
                26.166559
              ],
              [
                -98.069982,
                26.166539
              ],
              [
                -98.069987,
                26.166518
              ],
              [
                -98.069996,
                26.1665
              ],
              [
                -98.070012,
                26.166483
              ],
              [
                -98.070036,
                26.166478
              ],
              [
                -98.07006,
                26.166484
              ],
              [
                -98.070079,
                26.166498
              ],
              [
                -98.070082,
                26.166519
              ],
              [
                -98.070087,
                26.166539
              ],
              [
                -98.070073,
                26.166555
              ],
              [
                -98.07006,
                26.166573
              ],
              [
                -98.070036,
                26.166577
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-086",
          "cluster": "Central Kindergarten Learning Garden",
          "species": "Desert Willow",
          "crown_radius_ft": 17.5,
          "crown_diameter_ft": 35.0,
          "area_sqft": 960,
          "est_height_ft": 27.5,
          "cooling_drop_f": 6.2,
          "carbon_storage_lbs": 222.5,
          "detection_confidence": 95.6,
          "spectral_vari_score": 0.594,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.070153,
                26.16668
              ],
              [
                -98.070131,
                26.166676
              ],
              [
                -98.070111,
                26.166665
              ],
              [
                -98.070103,
                26.166645
              ],
              [
                -98.070104,
                26.166625
              ],
              [
                -98.070109,
                26.166604
              ],
              [
                -98.070128,
                26.166589
              ],
              [
                -98.070153,
                26.166586
              ],
              [
                -98.070177,
                26.16659
              ],
              [
                -98.070192,
                26.166607
              ],
              [
                -98.070208,
                26.166623
              ],
              [
                -98.070209,
                26.166646
              ],
              [
                -98.070197,
                26.166667
              ],
              [
                -98.070176,
                26.166678
              ],
              [
                -98.070153,
                26.16668
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-087",
          "cluster": "Central Kindergarten Learning Garden",
          "species": "Anacua",
          "crown_radius_ft": 12.3,
          "crown_diameter_ft": 24.5,
          "area_sqft": 471,
          "est_height_ft": 18.6,
          "cooling_drop_f": 5.2,
          "carbon_storage_lbs": 118.1,
          "detection_confidence": 98.4,
          "spectral_vari_score": 0.599,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.070322,
                26.166545
              ],
              [
                -98.070306,
                26.166541
              ],
              [
                -98.070293,
                26.166532
              ],
              [
                -98.070284,
                26.16652
              ],
              [
                -98.070285,
                26.166504
              ],
              [
                -98.070294,
                26.166492
              ],
              [
                -98.070306,
                26.166482
              ],
              [
                -98.070322,
                26.16648
              ],
              [
                -98.070338,
                26.166481
              ],
              [
                -98.070351,
                26.166491
              ],
              [
                -98.070356,
                26.166505
              ],
              [
                -98.070359,
                26.16652
              ],
              [
                -98.070353,
                26.166535
              ],
              [
                -98.070339,
                26.166544
              ],
              [
                -98.070322,
                26.166545
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-088",
          "cluster": "Central Kindergarten Learning Garden",
          "species": "Anacua",
          "crown_radius_ft": 12.6,
          "crown_diameter_ft": 25.2,
          "area_sqft": 501,
          "est_height_ft": 19.9,
          "cooling_drop_f": 5.3,
          "carbon_storage_lbs": 120.5,
          "detection_confidence": 98.2,
          "spectral_vari_score": 0.44,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.06994,
                26.1667
              ],
              [
                -98.069922,
                26.1667
              ],
              [
                -98.069909,
                26.16669
              ],
              [
                -98.069902,
                26.166675
              ],
              [
                -98.069902,
                26.16666
              ],
              [
                -98.069909,
                26.166646
              ],
              [
                -98.069923,
                26.166636
              ],
              [
                -98.06994,
                26.166632
              ],
              [
                -98.069956,
                26.166638
              ],
              [
                -98.069968,
                26.166647
              ],
              [
                -98.069979,
                26.166659
              ],
              [
                -98.06998,
                26.166676
              ],
              [
                -98.069968,
                26.166688
              ],
              [
                -98.069956,
                26.166699
              ],
              [
                -98.06994,
                26.1667
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-089",
          "cluster": "Central Kindergarten Learning Garden",
          "species": "Desert Willow",
          "crown_radius_ft": 14.2,
          "crown_diameter_ft": 28.3,
          "area_sqft": 629,
          "est_height_ft": 21.9,
          "cooling_drop_f": 5.6,
          "carbon_storage_lbs": 155.5,
          "detection_confidence": 96.5,
          "spectral_vari_score": 0.426,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.070359,
                26.166679
              ],
              [
                -98.070339,
                26.166679
              ],
              [
                -98.070326,
                26.166666
              ],
              [
                -98.070316,
                26.166651
              ],
              [
                -98.070315,
                26.166633
              ],
              [
                -98.070325,
                26.166618
              ],
              [
                -98.070339,
                26.166604
              ],
              [
                -98.070359,
                26.166603
              ],
              [
                -98.070377,
                26.16661
              ],
              [
                -98.070391,
                26.166619
              ],
              [
                -98.070401,
                26.166633
              ],
              [
                -98.070402,
                26.166651
              ],
              [
                -98.070394,
                26.166667
              ],
              [
                -98.070379,
                26.166678
              ],
              [
                -98.070359,
                26.166679
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-090",
          "cluster": "Central Kindergarten Learning Garden",
          "species": "Anacua",
          "crown_radius_ft": 11.4,
          "crown_diameter_ft": 22.7,
          "area_sqft": 405,
          "est_height_ft": 17.5,
          "cooling_drop_f": 5.1,
          "carbon_storage_lbs": 103.0,
          "detection_confidence": 98.9,
          "spectral_vari_score": 0.656,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.070387,
                26.166565
              ],
              [
                -98.070371,
                26.166566
              ],
              [
                -98.070358,
                26.166557
              ],
              [
                -98.070356,
                26.166542
              ],
              [
                -98.070351,
                26.166528
              ],
              [
                -98.070362,
                26.166518
              ],
              [
                -98.070372,
                26.166508
              ],
              [
                -98.070387,
                26.166503
              ],
              [
                -98.070403,
                26.166506
              ],
              [
                -98.070417,
                26.166515
              ],
              [
                -98.070422,
                26.166529
              ],
              [
                -98.070421,
                26.166543
              ],
              [
                -98.070417,
                26.166557
              ],
              [
                -98.070402,
                26.166563
              ],
              [
                -98.070387,
                26.166565
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-091",
          "cluster": "Central Kindergarten Learning Garden",
          "species": "Desert Willow",
          "crown_radius_ft": 15.1,
          "crown_diameter_ft": 30.3,
          "area_sqft": 719,
          "est_height_ft": 23.0,
          "cooling_drop_f": 5.8,
          "carbon_storage_lbs": 180.8,
          "detection_confidence": 95.9,
          "spectral_vari_score": 0.469,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.070063,
                26.166616
              ],
              [
                -98.070041,
                26.166618
              ],
              [
                -98.070027,
                26.166603
              ],
              [
                -98.070021,
                26.166586
              ],
              [
                -98.070014,
                26.166567
              ],
              [
                -98.070024,
                26.16655
              ],
              [
                -98.070042,
                26.166538
              ],
              [
                -98.070063,
                26.166532
              ],
              [
                -98.070083,
                26.16654
              ],
              [
                -98.0701,
                26.16655
              ],
              [
                -98.070107,
                26.166568
              ],
              [
                -98.070107,
                26.166586
              ],
              [
                -98.070097,
                26.166602
              ],
              [
                -98.070083,
                26.166615
              ],
              [
                -98.070063,
                26.166616
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-092",
          "cluster": "Central Kindergarten Learning Garden",
          "species": "Desert Willow",
          "crown_radius_ft": 9.8,
          "crown_diameter_ft": 19.5,
          "area_sqft": 300,
          "est_height_ft": 16.9,
          "cooling_drop_f": 4.8,
          "carbon_storage_lbs": 87.0,
          "detection_confidence": 97.3,
          "spectral_vari_score": 0.495,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.070023,
                26.166777
              ],
              [
                -98.070011,
                26.166771
              ],
              [
                -98.070001,
                26.166765
              ],
              [
                -98.069996,
                26.166754
              ],
              [
                -98.069996,
                26.166743
              ],
              [
                -98.069999,
                26.166732
              ],
              [
                -98.07001,
                26.166724
              ],
              [
                -98.070023,
                26.166724
              ],
              [
                -98.070037,
                26.166723
              ],
              [
                -98.070046,
                26.166732
              ],
              [
                -98.070051,
                26.166743
              ],
              [
                -98.070051,
                26.166754
              ],
              [
                -98.070048,
                26.166767
              ],
              [
                -98.070035,
                26.166771
              ],
              [
                -98.070023,
                26.166777
              ]
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "id": "TREE-ML-093",
          "cluster": "Central Kindergarten Learning Garden",
          "species": "Desert Willow",
          "crown_radius_ft": 12.2,
          "crown_diameter_ft": 24.4,
          "area_sqft": 468,
          "est_height_ft": 21.6,
          "cooling_drop_f": 5.2,
          "carbon_storage_lbs": 124.9,
          "detection_confidence": 97.9,
          "spectral_vari_score": 0.519,
          "shadow_rejection_passed": true,
          "in_plantable_site": true
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -98.070039,
                26.16676
              ],
              [
                -98.070022,
                26.166761
              ],
              [
                -98.070008,
                26.166751
              ],
              [
                -98.070003,
                26.166736
              ],
              [
                -98.070004,
                26.166721
              ],
              [
                -98.070011,
                26.166708
              ],
              [
                -98.070023,
                26.166698
              ],
              [
                -98.070039,
                26.166694
              ],
              [
                -98.070056,
                26.166697
              ],
              [
                -98.070067,
                26.166709
              ],
              [
                -98.070077,
                26.166721
              ],
              [
                -98.070076,
                26.166736
              ],
              [
                -98.070066,
                26.166748
              ],
              [
                -98.070055,
                26.166758
              ],
              [
                -98.070039,
                26.16676
              ]
            ]
          ]
        }
      }
    ]
  }
};
