// All 18 complete source pieces. See docs/PIECES-18.md.
(() => {
  const data=window.PIANO_DATA;
  if(!data?.bookCurricula||data.bookCurricula.some(c=>c.id==='pieces-18'))return;
  if(data.exercises.length!==154||data.stages.length!==32)throw new Error('Pieces require the existing study catalogs');
  const catalog={
  "stages": [
    [
      "Nghe và đổi người hát",
      "Giai điệu phải, trái và chuyển vai"
    ],
    [
      "Màu hòa âm dịu",
      "Thế gần, thế đảo và La thứ tự nhiên"
    ],
    [
      "Hai dòng chuyển động",
      "Rải trái/phải, song song và ngược hướng"
    ],
    [
      "Giữ tiếng và chia nhịp",
      "Hai trên bốn, dấu nối, chấm dôi và Sol trưởng"
    ],
    [
      "Nhịp bước và mặt hồ",
      "Bass–hợp âm, valse Fa trưởng và Alberti"
    ],
    [
      "Kể trọn một câu chuyện",
      "Lệch phách, G7 trở về và tổng hợp đệm"
    ]
  ],
  "exercises": [
    {
      "id": 155,
      "stage": 33,
      "title": "Ánh nắng đầu ngày",
      "bpm": 56,
      "meter": 4,
      "keySignature": "C",
      "rh": [
        [
          [
            "E4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "D4",
            1.0
          ],
          [
            "C4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "D4",
            1.0
          ],
          [
            "F4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "G4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 4
            }
          ],
          [
            "F4",
            1.0
          ],
          [
            "D4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "E4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "D4",
            1.0
          ],
          [
            "C4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "D4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "D4",
            1.0
          ],
          [
            "B3",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "A4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 4
            }
          ],
          [
            "G4",
            1.0
          ],
          [
            "E4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 4
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "C4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "F4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "E4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "D4",
            1.0
          ],
          [
            "C4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "D4",
            1.0
          ],
          [
            "F4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "G4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 4
            }
          ],
          [
            "F4",
            1.0
          ],
          [
            "D4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C4",
            4.0,
            {
              "fermata": true,
              "finger": 1
            }
          ]
        ]
      ],
      "lh": [
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "F3",
              "A3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "D3",
              "F3",
              "A3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "A3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "F3",
              "A3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "D3",
              "F3",
              "A3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "F3",
              "A3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            4.0,
            {
              "fermata": true,
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ]
      ],
      "harmony": [
        "C",
        "F/C",
        "G/B",
        "G/B",
        "C",
        "Dm",
        "G/B",
        "C",
        "Am/C",
        "F/C",
        "Dm",
        "G/B",
        "C",
        "F/C",
        "G/B",
        "C"
      ],
      "phraseMarkers": [
        "A",
        null,
        null,
        null,
        "A1",
        null,
        null,
        null,
        "B",
        null,
        null,
        null,
        "A2",
        null,
        null,
        null
      ],
      "dynamicChanges": [
        [
          {
            "hand": "rh",
            "value": "mp"
          },
          {
            "hand": "lh",
            "value": "p"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "value": "mf"
          }
        ],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "value": "mp"
          }
        ],
        [],
        [
          {
            "hand": "rh",
            "value": "p"
          }
        ],
        []
      ],
      "expressionWords": [
        [
          {
            "hand": "rh",
            "text": "Dolce / BPM 56"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "text": "dim."
          }
        ],
        []
      ],
      "studyLabels": [
        "A · C · P mp · T p",
        "F/C",
        "G/B",
        "G/B",
        "A1 · C",
        "Dm",
        "G/B",
        "C",
        "B · Am/C · P mf",
        "F/C",
        "Dm",
        "G/B",
        "A2 · C · P mp",
        "F/C",
        "G/B · P p · dim.",
        "C"
      ],
      "performance": {
        "rh": {
          "gainByBar": [
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            1.05,
            1.05,
            1.05,
            1.05,
            0.85,
            0.85,
            0.6,
            0.6
          ],
          "gate": 0.98
        },
        "lh": {
          "gainByBar": [
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6
          ],
          "gate": 0.98
        }
      },
      "goal": "Giai điệu phải trên hợp âm trái giữ",
      "focus": "Tay phải như đang hát; tay trái nhẹ hơn, không nhả theo từng nốt.",
      "pass_rule": "Chơi đủ 16 ô ở tốc độ bạn giữ được (từ 40 BPM), đúng nốt và nhịp, tiếng hát rõ hơn nền; tự kiểm tra trên đàn.",
      "variation": "Ngân nga khi tay kia đệm. Thử A nhỏ, B rõ hơn rồi trở lại A cùng tốc độ; hôm sau kiểm tra trước khi ôn.",
      "fingers": "Chỉ hiện số ngón nguồn ở điểm vào/đổi thế; chỗ không ghi số cần giữ thế tay phù hợp.",
      "touch": "Dolce: dịu và có hướng câu; p/mp/mf theo sheet. Đếm đủ nốt cuối trước khi ngân; pedal chỉ thêm khi nốt và nhịp đã ổn.",
      "mission": {
        "title": "Ánh nắng đầu ngày",
        "hand": "rh",
        "range": [
          1,
          4
        ],
        "duoRange": [
          7,
          9
        ],
        "solo": "Nghe và ngân nga câu A; đọc rồi tập tay phải riêng ô 1–4.",
        "duo": "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
        "finalTempo": 40,
        "finalBpm": 56,
        "labels": [
          "Nghe & học câu A",
          "Nối A1 vào B",
          "Chơi đủ 16 ô"
        ]
      },
      "phrases": [
        {
          "label": "A",
          "from": 1,
          "to": 4
        },
        {
          "label": "A1",
          "from": 5,
          "to": 8
        },
        {
          "label": "B",
          "from": 9,
          "to": 12
        },
        {
          "label": "A2",
          "from": 13,
          "to": 16
        },
        {
          "label": "Cả bài",
          "from": 1,
          "to": 16
        }
      ],
      "book": {
        "id": "pieces-18",
        "label": "18 tiểu phẩm · Những ngày êm đềm",
        "chapter": 1,
        "sourceNumber": 1,
        "pages": [
          9,
          8
        ],
        "kind": "transcribed",
        "reference": "Tiểu phẩm 01 · đủ 16 ô · trang sheet và trang học",
        "musicxml": "assets/books/pieces18-sources/01_piece.musicxml",
        "midi": {
          "both": "assets/books/pieces18-sources/01_both_hands.mid",
          "right": "assets/books/pieces18-sources/01_right_hand.mid",
          "left": "assets/books/pieces18-sources/01_left_hand.mid"
        },
        "repair": "Sửa đúng một lỗi; luyện ô lỗi cùng ô trước/sau, rồi nối lại câu. Nếu chưa ổn, giảm 4–8 BPM.",
        "repairLessons": [
          132,
          133,
          151
        ],
        "steps": [
          "Nghe và ngân nga câu A; đọc rồi tập tay phải riêng ô 1–4.",
          "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
          "Chơi đủ 16 ô không dừng: giai điệu rõ, nền nhẹ, đúng nốt/trường độ và tay thoải mái. Giữ đủ nốt cuối rồi mới ngân thêm."
        ],
        "review": "Hôm sau chơi một lượt trước khi ôn. Tự ghi một lỗi nốt/nhịp và một mục tiêu âm thanh; chưa có kiểm tra tự động sau nghỉ."
      }
    },
    {
      "id": 156,
      "stage": 33,
      "title": "Hai chiếc lá",
      "bpm": 56,
      "meter": 4,
      "keySignature": "C",
      "rh": [
        [
          [
            [
              "C4",
              "E4",
              "G4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            [
              "C4",
              "F4",
              "A4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            [
              "B3",
              "D4",
              "G4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            [
              "B3",
              "D4",
              "G4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            [
              "C4",
              "E4",
              "G4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            [
              "D4",
              "F4",
              "A4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            [
              "B3",
              "D4",
              "G4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            [
              "C4",
              "E4",
              "G4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            [
              "C4",
              "E4",
              "A4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            [
              "C4",
              "F4",
              "A4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            [
              "D4",
              "F4",
              "A4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            [
              "B3",
              "D4",
              "G4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            [
              "C4",
              "E4",
              "G4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            [
              "C4",
              "F4",
              "A4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            [
              "B3",
              "D4",
              "G4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            [
              "C4",
              "E4",
              "G4"
            ],
            4.0,
            {
              "fermata": true,
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ]
      ],
      "lh": [
        [
          [
            "C3",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 5
            }
          ],
          [
            "E3",
            1.0
          ],
          [
            "D3",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C3",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 5
            }
          ],
          [
            "D3",
            1.0
          ],
          [
            "F3",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D3",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 5
            }
          ],
          [
            "F3",
            1.0
          ],
          [
            "D3",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D3",
            4.0,
            {
              "finger": 5
            }
          ]
        ],
        [
          [
            "E3",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "D3",
            1.0
          ],
          [
            "C3",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F3",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "E3",
            1.0
          ],
          [
            "D3",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D3",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 5
            }
          ],
          [
            "F3",
            1.0
          ],
          [
            "E3",
            1.0
          ],
          [
            "D3",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C3",
            4.0,
            {
              "finger": 5
            }
          ]
        ],
        [
          [
            "E3",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 5
            }
          ],
          [
            "G3",
            1.0
          ],
          [
            "A3",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F3",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 2
            }
          ],
          [
            "E3",
            1.0
          ],
          [
            "C3",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F3",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "E3",
            1.0
          ],
          [
            "D3",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D3",
            4.0,
            {
              "finger": 5
            }
          ]
        ],
        [
          [
            "C3",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 5
            }
          ],
          [
            "E3",
            1.0
          ],
          [
            "D3",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C3",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 5
            }
          ],
          [
            "D3",
            1.0
          ],
          [
            "F3",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D3",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 5
            }
          ],
          [
            "F3",
            1.0
          ],
          [
            "D3",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C3",
            4.0,
            {
              "fermata": true,
              "finger": 5
            }
          ]
        ]
      ],
      "harmony": [
        "C",
        "F/C",
        "G/B",
        "G/B",
        "C",
        "Dm",
        "G/B",
        "C",
        "Am/C",
        "F/C",
        "Dm",
        "G/B",
        "C",
        "F/C",
        "G/B",
        "C"
      ],
      "phraseMarkers": [
        "A",
        null,
        null,
        null,
        "A1",
        null,
        null,
        null,
        "B",
        null,
        null,
        null,
        "A2",
        null,
        null,
        null
      ],
      "dynamicChanges": [
        [
          {
            "hand": "rh",
            "value": "p"
          },
          {
            "hand": "lh",
            "value": "mp"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "lh",
            "value": "mf"
          }
        ],
        [],
        [],
        [],
        [
          {
            "hand": "lh",
            "value": "mp"
          }
        ],
        [],
        [
          {
            "hand": "lh",
            "value": "p"
          }
        ],
        []
      ],
      "expressionWords": [
        [
          {
            "hand": "rh",
            "text": "Dolce / BPM 56"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "lh",
            "text": "dim."
          }
        ],
        []
      ],
      "studyLabels": [
        "A · C · P p · T mp",
        "F/C",
        "G/B",
        "G/B",
        "A1 · C",
        "Dm",
        "G/B",
        "C",
        "B · Am/C · T mf",
        "F/C",
        "Dm",
        "G/B",
        "A2 · C · T mp",
        "F/C",
        "G/B · T p · dim.",
        "C"
      ],
      "performance": {
        "rh": {
          "gainByBar": [
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6
          ],
          "gate": 0.98
        },
        "lh": {
          "gainByBar": [
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            1.05,
            1.05,
            1.05,
            1.05,
            0.85,
            0.85,
            0.6,
            0.6
          ],
          "gate": 0.98
        }
      },
      "goal": "Giai điệu trái, hợp âm phải làm nền",
      "focus": "Tay trái hát rõ hơn; tay phải giữ mềm, không che giai điệu.",
      "pass_rule": "Chơi đủ 16 ô ở tốc độ bạn giữ được (từ 40 BPM), đúng nốt và nhịp, tiếng hát rõ hơn nền; tự kiểm tra trên đàn.",
      "variation": "Ngân nga khi tay kia đệm. Thử A nhỏ, B rõ hơn rồi trở lại A cùng tốc độ; hôm sau kiểm tra trước khi ôn.",
      "fingers": "Chỉ hiện số ngón nguồn ở điểm vào/đổi thế; chỗ không ghi số cần giữ thế tay phù hợp.",
      "touch": "Dolce: dịu và có hướng câu; p/mp/mf theo sheet. Đếm đủ nốt cuối trước khi ngân; pedal chỉ thêm khi nốt và nhịp đã ổn.",
      "mission": {
        "title": "Hai chiếc lá",
        "hand": "lh",
        "range": [
          1,
          4
        ],
        "duoRange": [
          7,
          9
        ],
        "solo": "Nghe và ngân nga câu A; đọc rồi tập tay trái riêng ô 1–4.",
        "duo": "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
        "finalTempo": 40,
        "finalBpm": 56,
        "labels": [
          "Nghe & học câu A",
          "Nối A1 vào B",
          "Chơi đủ 16 ô"
        ]
      },
      "phrases": [
        {
          "label": "A",
          "from": 1,
          "to": 4
        },
        {
          "label": "A1",
          "from": 5,
          "to": 8
        },
        {
          "label": "B",
          "from": 9,
          "to": 12
        },
        {
          "label": "A2",
          "from": 13,
          "to": 16
        },
        {
          "label": "Cả bài",
          "from": 1,
          "to": 16
        }
      ],
      "book": {
        "id": "pieces-18",
        "label": "18 tiểu phẩm · Những ngày êm đềm",
        "chapter": 1,
        "sourceNumber": 2,
        "pages": [
          11,
          10
        ],
        "kind": "transcribed",
        "reference": "Tiểu phẩm 02 · đủ 16 ô · trang sheet và trang học",
        "musicxml": "assets/books/pieces18-sources/02_piece.musicxml",
        "midi": {
          "both": "assets/books/pieces18-sources/02_both_hands.mid",
          "right": "assets/books/pieces18-sources/02_right_hand.mid",
          "left": "assets/books/pieces18-sources/02_left_hand.mid"
        },
        "repair": "Sửa đúng một lỗi; luyện ô lỗi cùng ô trước/sau, rồi nối lại câu. Nếu chưa ổn, giảm 4–8 BPM.",
        "repairLessons": [
          131,
          144,
          152
        ],
        "steps": [
          "Nghe và ngân nga câu A; đọc rồi tập tay trái riêng ô 1–4.",
          "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
          "Chơi đủ 16 ô không dừng: giai điệu rõ, nền nhẹ, đúng nốt/trường độ và tay thoải mái. Giữ đủ nốt cuối rồi mới ngân thêm."
        ],
        "review": "Hôm sau chơi một lượt trước khi ôn. Tự ghi một lỗi nốt/nhịp và một mục tiêu âm thanh; chưa có kiểm tra tự động sau nghỉ."
      }
    },
    {
      "id": 157,
      "stage": 33,
      "title": "Tiếng chim bên cửa",
      "bpm": 56,
      "meter": 4,
      "keySignature": "C",
      "rh": [
        [
          [
            "E4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "G4",
            1.0
          ],
          [
            "E4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            [
              "C4",
              "F4",
              "A4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            "D4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "F4",
            1.0
          ],
          [
            "D4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            [
              "B3",
              "D4",
              "G4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            "E4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "G4",
            1.0
          ],
          [
            "E4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            [
              "D4",
              "F4",
              "A4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            "D4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "D4",
            1.0
          ],
          [
            "B3",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            [
              "C4",
              "E4",
              "G4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            "E4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "A4",
            1.0
          ],
          [
            "G4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            [
              "C4",
              "F4",
              "A4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "D4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            [
              "B3",
              "D4",
              "G4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            "E4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "G4",
            1.0
          ],
          [
            "E4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            [
              "C4",
              "F4",
              "A4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            "D4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "F4",
            1.0
          ],
          [
            "D4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            [
              "C4",
              "E4",
              "G4"
            ],
            4.0,
            {
              "fermata": true,
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ]
      ],
      "lh": [
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            "F3",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 2
            }
          ],
          [
            "E3",
            1.0
          ],
          [
            "C3",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            "D3",
            4.0,
            {
              "finger": 5
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            "F3",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "E3",
            1.0
          ],
          [
            "D3",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            "C3",
            4.0,
            {
              "finger": 5
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "A3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            "F3",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 2
            }
          ],
          [
            "E3",
            1.0
          ],
          [
            "C3",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            [
              "D3",
              "F3",
              "A3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            "D3",
            4.0,
            {
              "finger": 5
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            "F3",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 2
            }
          ],
          [
            "E3",
            1.0
          ],
          [
            "C3",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            "C3",
            4.0,
            {
              "fermata": true,
              "finger": 5
            }
          ]
        ]
      ],
      "harmony": [
        "C",
        "F/C",
        "G/B",
        "G/B",
        "C",
        "Dm",
        "G/B",
        "C",
        "Am/C",
        "F/C",
        "Dm",
        "G/B",
        "C",
        "F/C",
        "G/B",
        "C"
      ],
      "phraseMarkers": [
        "A",
        null,
        null,
        null,
        "A1",
        null,
        null,
        null,
        "B",
        null,
        null,
        null,
        "A2",
        null,
        null,
        null
      ],
      "dynamicChanges": [
        [
          {
            "hand": "rh",
            "value": "mp"
          },
          {
            "hand": "lh",
            "value": "p"
          }
        ],
        [
          {
            "hand": "rh",
            "value": "p"
          },
          {
            "hand": "lh",
            "value": "mp"
          }
        ],
        [
          {
            "hand": "rh",
            "value": "mp"
          },
          {
            "hand": "lh",
            "value": "p"
          }
        ],
        [
          {
            "hand": "rh",
            "value": "p"
          },
          {
            "hand": "lh",
            "value": "mp"
          }
        ],
        [
          {
            "hand": "rh",
            "value": "mp"
          },
          {
            "hand": "lh",
            "value": "p"
          }
        ],
        [
          {
            "hand": "rh",
            "value": "p"
          },
          {
            "hand": "lh",
            "value": "mp"
          }
        ],
        [
          {
            "hand": "rh",
            "value": "mp"
          },
          {
            "hand": "lh",
            "value": "p"
          }
        ],
        [
          {
            "hand": "rh",
            "value": "p"
          },
          {
            "hand": "lh",
            "value": "mp"
          }
        ],
        [
          {
            "hand": "rh",
            "value": "mf"
          },
          {
            "hand": "rh",
            "value": "mp"
          },
          {
            "hand": "lh",
            "value": "p"
          }
        ],
        [
          {
            "hand": "rh",
            "value": "p"
          },
          {
            "hand": "lh",
            "value": "mp"
          }
        ],
        [
          {
            "hand": "rh",
            "value": "mp"
          },
          {
            "hand": "lh",
            "value": "p"
          }
        ],
        [
          {
            "hand": "rh",
            "value": "p"
          },
          {
            "hand": "lh",
            "value": "mp"
          }
        ],
        [
          {
            "hand": "rh",
            "value": "mp"
          },
          {
            "hand": "rh",
            "value": "mp"
          },
          {
            "hand": "lh",
            "value": "p"
          }
        ],
        [
          {
            "hand": "rh",
            "value": "p"
          },
          {
            "hand": "lh",
            "value": "mp"
          }
        ],
        [
          {
            "hand": "rh",
            "value": "p"
          },
          {
            "hand": "rh",
            "value": "mp"
          },
          {
            "hand": "lh",
            "value": "p"
          }
        ],
        [
          {
            "hand": "rh",
            "value": "p"
          },
          {
            "hand": "lh",
            "value": "mp"
          }
        ]
      ],
      "expressionWords": [
        [
          {
            "hand": "rh",
            "text": "Dolce / BPM 56"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "text": "dim."
          }
        ],
        []
      ],
      "studyLabels": [
        "A · C · P mp · T p",
        "F/C · P p · T mp",
        "G/B · P mp · T p",
        "G/B · P p · T mp",
        "A1 · C · P mp · T p",
        "Dm · P p · T mp",
        "G/B · P mp · T p",
        "C · P p · T mp",
        "B · Am/C · P mf→mp · T p",
        "F/C · P p · T mp",
        "Dm · P mp · T p",
        "G/B · P p · T mp",
        "A2 · C · P mp→mp · T p",
        "F/C · P p · T mp",
        "G/B · P p→mp · T p · dim.",
        "C · P p · T mp"
      ],
      "performance": {
        "rh": {
          "gainByBar": [
            0.85,
            0.6,
            0.85,
            0.6,
            0.85,
            0.6,
            0.85,
            0.6,
            0.85,
            0.6,
            0.85,
            0.6,
            0.85,
            0.6,
            0.85,
            0.6
          ],
          "gate": 0.98
        },
        "lh": {
          "gainByBar": [
            0.6,
            0.85,
            0.6,
            0.85,
            0.6,
            0.85,
            0.6,
            0.85,
            0.6,
            0.85,
            0.6,
            0.85,
            0.6,
            0.85,
            0.6,
            0.85
          ],
          "gate": 0.98
        }
      },
      "goal": "Chuyển giai điệu giữa hai tay",
      "focus": "Ô lẻ giai điệu ở phải, ô chẵn ở trái. Giữ cùng một nhịp khi đổi người hát.",
      "pass_rule": "Chơi đủ 16 ô ở tốc độ bạn giữ được (từ 40 BPM), đúng nốt và nhịp, tiếng hát rõ hơn nền; tự kiểm tra trên đàn.",
      "variation": "Ngân nga khi tay kia đệm. Thử A nhỏ, B rõ hơn rồi trở lại A cùng tốc độ; hôm sau kiểm tra trước khi ôn.",
      "fingers": "Chỉ hiện số ngón nguồn ở điểm vào/đổi thế; chỗ không ghi số cần giữ thế tay phù hợp.",
      "touch": "Dolce: dịu và có hướng câu; p/mp/mf theo sheet. Đếm đủ nốt cuối trước khi ngân; pedal chỉ thêm khi nốt và nhịp đã ổn.",
      "mission": {
        "title": "Tiếng chim bên cửa",
        "hand": "rh",
        "range": [
          1,
          4
        ],
        "duoRange": [
          7,
          9
        ],
        "solo": "Nghe và ngân nga câu A; đọc rồi tập tay phải riêng ô 1–4.",
        "duo": "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
        "finalTempo": 40,
        "finalBpm": 56,
        "labels": [
          "Nghe & học câu A",
          "Nối A1 vào B",
          "Chơi đủ 16 ô"
        ]
      },
      "phrases": [
        {
          "label": "A",
          "from": 1,
          "to": 4
        },
        {
          "label": "A1",
          "from": 5,
          "to": 8
        },
        {
          "label": "B",
          "from": 9,
          "to": 12
        },
        {
          "label": "A2",
          "from": 13,
          "to": 16
        },
        {
          "label": "Cả bài",
          "from": 1,
          "to": 16
        }
      ],
      "book": {
        "id": "pieces-18",
        "label": "18 tiểu phẩm · Những ngày êm đềm",
        "chapter": 1,
        "sourceNumber": 3,
        "pages": [
          13,
          12
        ],
        "kind": "transcribed",
        "reference": "Tiểu phẩm 03 · đủ 16 ô · trang sheet và trang học",
        "musicxml": "assets/books/pieces18-sources/03_piece.musicxml",
        "midi": {
          "both": "assets/books/pieces18-sources/03_both_hands.mid",
          "right": "assets/books/pieces18-sources/03_right_hand.mid",
          "left": "assets/books/pieces18-sources/03_left_hand.mid"
        },
        "repair": "Sửa đúng một lỗi; luyện ô lỗi cùng ô trước/sau, rồi nối lại câu. Nếu chưa ổn, giảm 4–8 BPM.",
        "repairLessons": [
          131,
          132,
          134
        ],
        "steps": [
          "Nghe và ngân nga câu A; đọc rồi tập tay phải riêng ô 1–4.",
          "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
          "Chơi đủ 16 ô không dừng: giai điệu rõ, nền nhẹ, đúng nốt/trường độ và tay thoải mái. Giữ đủ nốt cuối rồi mới ngân thêm."
        ],
        "review": "Hôm sau chơi một lượt trước khi ôn. Tự ghi một lỗi nốt/nhịp và một mục tiêu âm thanh; chưa có kiểm tra tự động sau nghỉ."
      }
    },
    {
      "id": 158,
      "stage": 34,
      "title": "Lối nhỏ trong vườn",
      "bpm": 56,
      "meter": 4,
      "keySignature": "C",
      "rh": [
        [
          [
            "C4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "D4",
            1.0
          ],
          [
            "E4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 4
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "C4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "F4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "E4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "G4",
            1.0
          ],
          [
            "E4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "D4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "B3",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "E4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "G4",
            1.0
          ],
          [
            "A4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 4
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "C4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "D4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "C4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "D4",
            1.0
          ],
          [
            "E4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 4
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "C4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "F4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C4",
            4.0,
            {
              "fermata": true,
              "finger": 1
            }
          ]
        ]
      ],
      "lh": [
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ],
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "F3",
              "A3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ],
          [
            [
              "C3",
              "F3",
              "A3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ],
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ],
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ],
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "D3",
              "F3",
              "A3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ],
          [
            [
              "D3",
              "F3",
              "A3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ],
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ],
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "A3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ],
          [
            [
              "C3",
              "E3",
              "A3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "F3",
              "A3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ],
          [
            [
              "C3",
              "F3",
              "A3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "D3",
              "F3",
              "A3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ],
          [
            [
              "D3",
              "F3",
              "A3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ],
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ],
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "F3",
              "A3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ],
          [
            [
              "C3",
              "F3",
              "A3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ],
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            4.0,
            {
              "fermata": true,
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ]
      ],
      "harmony": [
        "C",
        "F/C",
        "G/B",
        "G/B",
        "C",
        "Dm",
        "G/B",
        "C",
        "Am/C",
        "F/C",
        "Dm",
        "G/B",
        "C",
        "F/C",
        "G/B",
        "C"
      ],
      "phraseMarkers": [
        "A",
        null,
        null,
        null,
        "A1",
        null,
        null,
        null,
        "B",
        null,
        null,
        null,
        "A2",
        null,
        null,
        null
      ],
      "dynamicChanges": [
        [
          {
            "hand": "rh",
            "value": "mp"
          },
          {
            "hand": "lh",
            "value": "p"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "value": "mf"
          }
        ],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "value": "mp"
          }
        ],
        [],
        [
          {
            "hand": "rh",
            "value": "p"
          }
        ],
        []
      ],
      "expressionWords": [
        [
          {
            "hand": "rh",
            "text": "Dolce / BPM 56"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "text": "dim."
          }
        ],
        []
      ],
      "studyLabels": [
        "A · C · P mp · T p",
        "F/C",
        "G/B",
        "G/B",
        "A1 · C",
        "Dm",
        "G/B",
        "C",
        "B · Am/C · P mf",
        "F/C",
        "Dm",
        "G/B",
        "A2 · C · P mp",
        "F/C",
        "G/B · P p · dim.",
        "C"
      ],
      "performance": {
        "rh": {
          "gainByBar": [
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            1.05,
            1.05,
            1.05,
            1.05,
            0.85,
            0.85,
            0.6,
            0.6
          ],
          "gate": 0.98
        },
        "lh": {
          "gainByBar": [
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6
          ],
          "gate": 0.98
        }
      },
      "goal": "Đổi hợp âm bằng thế gần và nốt trắng",
      "focus": "Trái C-F/C-G/B; chuẩn bị hình hợp âm kế tiếp trong lúc giữ nốt trắng.",
      "pass_rule": "Chơi đủ 16 ô ở tốc độ bạn giữ được (từ 40 BPM), đúng nốt và nhịp, tiếng hát rõ hơn nền; tự kiểm tra trên đàn.",
      "variation": "Ngân nga khi tay kia đệm. Thử A nhỏ, B rõ hơn rồi trở lại A cùng tốc độ; hôm sau kiểm tra trước khi ôn.",
      "fingers": "Chỉ hiện số ngón nguồn ở điểm vào/đổi thế; chỗ không ghi số cần giữ thế tay phù hợp.",
      "touch": "Dolce: dịu và có hướng câu; p/mp/mf theo sheet. Đếm đủ nốt cuối trước khi ngân; pedal chỉ thêm khi nốt và nhịp đã ổn.",
      "mission": {
        "title": "Lối nhỏ trong vườn",
        "hand": "rh",
        "range": [
          1,
          4
        ],
        "duoRange": [
          7,
          9
        ],
        "solo": "Nghe và ngân nga câu A; đọc rồi tập tay phải riêng ô 1–4.",
        "duo": "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
        "finalTempo": 40,
        "finalBpm": 56,
        "labels": [
          "Nghe & học câu A",
          "Nối A1 vào B",
          "Chơi đủ 16 ô"
        ]
      },
      "phrases": [
        {
          "label": "A",
          "from": 1,
          "to": 4
        },
        {
          "label": "A1",
          "from": 5,
          "to": 8
        },
        {
          "label": "B",
          "from": 9,
          "to": 12
        },
        {
          "label": "A2",
          "from": 13,
          "to": 16
        },
        {
          "label": "Cả bài",
          "from": 1,
          "to": 16
        }
      ],
      "book": {
        "id": "pieces-18",
        "label": "18 tiểu phẩm · Những ngày êm đềm",
        "chapter": 2,
        "sourceNumber": 4,
        "pages": [
          15,
          14
        ],
        "kind": "transcribed",
        "reference": "Tiểu phẩm 04 · đủ 16 ô · trang sheet và trang học",
        "musicxml": "assets/books/pieces18-sources/04_piece.musicxml",
        "midi": {
          "both": "assets/books/pieces18-sources/04_both_hands.mid",
          "right": "assets/books/pieces18-sources/04_right_hand.mid",
          "left": "assets/books/pieces18-sources/04_left_hand.mid"
        },
        "repair": "Sửa đúng một lỗi; luyện ô lỗi cùng ô trước/sau, rồi nối lại câu. Nếu chưa ổn, giảm 4–8 BPM.",
        "repairLessons": [
          135,
          136
        ],
        "steps": [
          "Nghe và ngân nga câu A; đọc rồi tập tay phải riêng ô 1–4.",
          "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
          "Chơi đủ 16 ô không dừng: giai điệu rõ, nền nhẹ, đúng nốt/trường độ và tay thoải mái. Giữ đủ nốt cuối rồi mới ngân thêm."
        ],
        "review": "Hôm sau chơi một lượt trước khi ôn. Tự ghi một lỗi nốt/nhịp và một mục tiêu âm thanh; chưa có kiểm tra tự động sau nghỉ."
      }
    },
    {
      "id": 159,
      "stage": 34,
      "title": "Đám mây đổi màu",
      "bpm": 56,
      "meter": 4,
      "keySignature": "C",
      "rh": [
        [
          [
            [
              "C4",
              "E4",
              "G4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            [
              "E4",
              "G4",
              "C5"
            ],
            4.0,
            {
              "fingers": [
                1,
                2,
                5
              ]
            }
          ]
        ],
        [
          [
            [
              "G4",
              "C5",
              "E5"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            [
              "B3",
              "D4",
              "G4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            [
              "C4",
              "E4",
              "G4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            [
              "E4",
              "G4",
              "C5"
            ],
            4.0,
            {
              "fingers": [
                1,
                2,
                5
              ]
            }
          ]
        ],
        [
          [
            [
              "B3",
              "D4",
              "G4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            [
              "C4",
              "E4",
              "G4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            [
              "C4",
              "E4",
              "A4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            [
              "C4",
              "F4",
              "A4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            [
              "B3",
              "D4",
              "G4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            [
              "B3",
              "D4",
              "G4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            [
              "C4",
              "E4",
              "G4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            [
              "E4",
              "G4",
              "C5"
            ],
            4.0,
            {
              "fingers": [
                1,
                2,
                5
              ]
            }
          ]
        ],
        [
          [
            [
              "B3",
              "D4",
              "G4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ]
        ],
        [
          [
            [
              "E4",
              "G4",
              "C5"
            ],
            4.0,
            {
              "fermata": true,
              "fingers": [
                1,
                2,
                5
              ]
            }
          ]
        ]
      ],
      "lh": [
        [
          [
            "C3",
            4.0,
            {
              "finger": 5
            }
          ]
        ],
        [
          [
            "E3",
            4.0,
            {
              "finger": 5
            }
          ]
        ],
        [
          [
            "G3",
            4.0,
            {
              "finger": 5
            }
          ]
        ],
        [
          [
            "B2",
            4.0,
            {
              "finger": 5
            }
          ]
        ],
        [
          [
            "C3",
            4.0,
            {
              "finger": 5
            }
          ]
        ],
        [
          [
            "E3",
            4.0,
            {
              "finger": 5
            }
          ]
        ],
        [
          [
            "B2",
            4.0,
            {
              "finger": 5
            }
          ]
        ],
        [
          [
            "C3",
            4.0,
            {
              "finger": 5
            }
          ]
        ],
        [
          [
            "C3",
            4.0,
            {
              "finger": 5
            }
          ]
        ],
        [
          [
            "C3",
            4.0,
            {
              "finger": 5
            }
          ]
        ],
        [
          [
            "B2",
            4.0,
            {
              "finger": 5
            }
          ]
        ],
        [
          [
            "B2",
            4.0,
            {
              "finger": 5
            }
          ]
        ],
        [
          [
            "C3",
            4.0,
            {
              "finger": 5
            }
          ]
        ],
        [
          [
            "E3",
            4.0,
            {
              "finger": 5
            }
          ]
        ],
        [
          [
            "B2",
            4.0,
            {
              "finger": 5
            }
          ]
        ],
        [
          [
            "C3",
            4.0,
            {
              "fermata": true,
              "finger": 5
            }
          ]
        ]
      ],
      "harmony": [
        "C",
        "C/E",
        "C/G",
        "G/B",
        "C",
        "C/E",
        "G/B",
        "C",
        "Am/C",
        "F/C",
        "G/B",
        "G/B",
        "C",
        "C/E",
        "G/B",
        "C"
      ],
      "phraseMarkers": [
        "A",
        null,
        null,
        null,
        "A1",
        null,
        null,
        null,
        "B",
        null,
        null,
        null,
        "A2",
        null,
        null,
        null
      ],
      "dynamicChanges": [
        [
          {
            "hand": "rh",
            "value": "mp"
          },
          {
            "hand": "lh",
            "value": "p"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "value": "mf"
          }
        ],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "value": "mp"
          }
        ],
        [],
        [
          {
            "hand": "rh",
            "value": "p"
          }
        ],
        []
      ],
      "expressionWords": [
        [
          {
            "hand": "rh",
            "text": "Dolce / BPM 56"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "text": "dim."
          }
        ],
        []
      ],
      "studyLabels": [
        "A · C · P mp · T p",
        "C/E",
        "C/G",
        "G/B",
        "A1 · C",
        "C/E",
        "G/B",
        "C",
        "B · Am/C · P mf",
        "F/C",
        "G/B",
        "G/B",
        "A2 · C · P mp",
        "C/E",
        "G/B · P p · dim.",
        "C"
      ],
      "performance": {
        "rh": {
          "gainByBar": [
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            1.05,
            1.05,
            1.05,
            1.05,
            0.85,
            0.85,
            0.6,
            0.6
          ],
          "gate": 0.98
        },
        "lh": {
          "gainByBar": [
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6
          ],
          "gate": 0.98
        }
      },
      "goal": "Giai điệu ở nốt trên của các đảo hợp âm",
      "focus": "Nốt cao nhất của hợp âm là giai điệu. Nhấc và chuyển cả bàn tay giữa hai thế.",
      "pass_rule": "Chơi đủ 16 ô ở tốc độ bạn giữ được (từ 40 BPM), đúng nốt và nhịp, tiếng hát rõ hơn nền; tự kiểm tra trên đàn.",
      "variation": "Ngân nga khi tay kia đệm. Thử A nhỏ, B rõ hơn rồi trở lại A cùng tốc độ; hôm sau kiểm tra trước khi ôn.",
      "fingers": "Chỉ hiện số ngón nguồn ở điểm vào/đổi thế; chỗ không ghi số cần giữ thế tay phù hợp.",
      "touch": "Dolce: dịu và có hướng câu; p/mp/mf theo sheet. Đếm đủ nốt cuối trước khi ngân; pedal chỉ thêm khi nốt và nhịp đã ổn.",
      "mission": {
        "title": "Đám mây đổi màu",
        "hand": "rh",
        "range": [
          1,
          4
        ],
        "duoRange": [
          7,
          9
        ],
        "solo": "Nghe và ngân nga câu A; đọc rồi tập tay phải riêng ô 1–4.",
        "duo": "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
        "finalTempo": 40,
        "finalBpm": 56,
        "labels": [
          "Nghe & học câu A",
          "Nối A1 vào B",
          "Chơi đủ 16 ô"
        ]
      },
      "phrases": [
        {
          "label": "A",
          "from": 1,
          "to": 4
        },
        {
          "label": "A1",
          "from": 5,
          "to": 8
        },
        {
          "label": "B",
          "from": 9,
          "to": 12
        },
        {
          "label": "A2",
          "from": 13,
          "to": 16
        },
        {
          "label": "Cả bài",
          "from": 1,
          "to": 16
        }
      ],
      "book": {
        "id": "pieces-18",
        "label": "18 tiểu phẩm · Những ngày êm đềm",
        "chapter": 2,
        "sourceNumber": 5,
        "pages": [
          17,
          16
        ],
        "kind": "transcribed",
        "reference": "Tiểu phẩm 05 · đủ 16 ô · trang sheet và trang học",
        "musicxml": "assets/books/pieces18-sources/05_piece.musicxml",
        "midi": {
          "both": "assets/books/pieces18-sources/05_both_hands.mid",
          "right": "assets/books/pieces18-sources/05_right_hand.mid",
          "left": "assets/books/pieces18-sources/05_left_hand.mid"
        },
        "repair": "Sửa đúng một lỗi; luyện ô lỗi cùng ô trước/sau, rồi nối lại câu. Nếu chưa ổn, giảm 4–8 BPM.",
        "repairLessons": [
          133,
          137,
          151
        ],
        "steps": [
          "Nghe và ngân nga câu A; đọc rồi tập tay phải riêng ô 1–4.",
          "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
          "Chơi đủ 16 ô không dừng: giai điệu rõ, nền nhẹ, đúng nốt/trường độ và tay thoải mái. Giữ đủ nốt cuối rồi mới ngân thêm."
        ],
        "review": "Hôm sau chơi một lượt trước khi ôn. Tự ghi một lỗi nốt/nhịp và một mục tiêu âm thanh; chưa có kiểm tra tự động sau nghỉ."
      }
    },
    {
      "id": 160,
      "stage": 34,
      "title": "Chiều bên hiên",
      "bpm": 56,
      "meter": 4,
      "keySignature": "C",
      "rh": [
        [
          [
            "C5",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "B4",
            1.0
          ],
          [
            "A4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D5",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "C5",
            1.0
          ],
          [
            "B4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "B4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "C5",
            1.0
          ],
          [
            "B4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "B4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "C5",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "E5",
            1.0
          ],
          [
            "C5",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D5",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "C5",
            1.0
          ],
          [
            "B4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "B4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "G4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "A4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "F5",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 4
            }
          ],
          [
            "E5",
            1.0
          ],
          [
            "C5",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D5",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 4
            }
          ],
          [
            "C5",
            1.0
          ],
          [
            "A4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "B4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "C5",
            1.0
          ],
          [
            "D5",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "B4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "C5",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "B4",
            1.0
          ],
          [
            "A4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D5",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "C5",
            1.0
          ],
          [
            "B4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "B4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "C5",
            1.0
          ],
          [
            "B4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "A4",
            4.0,
            {
              "fermata": true,
              "finger": 1
            }
          ]
        ]
      ],
      "lh": [
        [
          [
            [
              "A2",
              "C3",
              "E3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "A2",
              "D3",
              "F3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "G2",
              "B2",
              "E3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "G2",
              "B2",
              "E3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "A2",
              "C3",
              "E3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "A2",
              "D3",
              "F3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "G2",
              "B2",
              "E3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "A2",
              "C3",
              "E3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "A2",
              "C3",
              "F3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "A2",
              "D3",
              "F3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "G2",
              "B2",
              "E3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "G2",
              "B2",
              "E3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "A2",
              "C3",
              "E3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "A2",
              "D3",
              "F3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "G2",
              "B2",
              "E3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "A2",
              "C3",
              "E3"
            ],
            4.0,
            {
              "fermata": true,
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ]
      ],
      "harmony": [
        "Am",
        "Dm/A",
        "Em/G",
        "Em/G",
        "Am",
        "Dm/A",
        "Em/G",
        "Am",
        "F/A",
        "Dm/A",
        "Em/G",
        "Em/G",
        "Am",
        "Dm/A",
        "Em/G",
        "Am"
      ],
      "phraseMarkers": [
        "A",
        null,
        null,
        null,
        "A1",
        null,
        null,
        null,
        "B",
        null,
        null,
        null,
        "A2",
        null,
        null,
        null
      ],
      "dynamicChanges": [
        [
          {
            "hand": "rh",
            "value": "mp"
          },
          {
            "hand": "lh",
            "value": "p"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "value": "mf"
          }
        ],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "value": "mp"
          }
        ],
        [],
        [
          {
            "hand": "rh",
            "value": "p"
          }
        ],
        []
      ],
      "expressionWords": [
        [
          {
            "hand": "rh",
            "text": "Dolce / BPM 56"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "text": "dim."
          }
        ],
        []
      ],
      "studyLabels": [
        "A · Am · P mp · T p",
        "Dm/A",
        "Em/G",
        "Em/G",
        "A1 · Am",
        "Dm/A",
        "Em/G",
        "Am",
        "B · F/A · P mf",
        "Dm/A",
        "Em/G",
        "Em/G",
        "A2 · Am · P mp",
        "Dm/A",
        "Em/G · P p · dim.",
        "Am"
      ],
      "performance": {
        "rh": {
          "gainByBar": [
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            1.05,
            1.05,
            1.05,
            1.05,
            0.85,
            0.85,
            0.6,
            0.6
          ],
          "gate": 0.98
        },
        "lh": {
          "gainByBar": [
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6
          ],
          "gate": 0.98
        }
      },
      "goal": "Vòng i-iv-v-i và màu thứ dịu",
      "focus": "La thứ tự nhiên dùng Sol thường, hợp âm Em thay cho E trưởng; không có Sol thăng.",
      "pass_rule": "Chơi đủ 16 ô ở tốc độ bạn giữ được (từ 40 BPM), đúng nốt và nhịp, tiếng hát rõ hơn nền; tự kiểm tra trên đàn.",
      "variation": "Ngân nga khi tay kia đệm. Thử A nhỏ, B rõ hơn rồi trở lại A cùng tốc độ; hôm sau kiểm tra trước khi ôn.",
      "fingers": "Chỉ hiện số ngón nguồn ở điểm vào/đổi thế; chỗ không ghi số cần giữ thế tay phù hợp.",
      "touch": "Dolce: dịu và có hướng câu; p/mp/mf theo sheet. Đếm đủ nốt cuối trước khi ngân; pedal chỉ thêm khi nốt và nhịp đã ổn.",
      "mission": {
        "title": "Chiều bên hiên",
        "hand": "rh",
        "range": [
          1,
          4
        ],
        "duoRange": [
          7,
          9
        ],
        "solo": "Nghe và ngân nga câu A; đọc rồi tập tay phải riêng ô 1–4.",
        "duo": "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
        "finalTempo": 40,
        "finalBpm": 56,
        "labels": [
          "Nghe & học câu A",
          "Nối A1 vào B",
          "Chơi đủ 16 ô"
        ]
      },
      "phrases": [
        {
          "label": "A",
          "from": 1,
          "to": 4
        },
        {
          "label": "A1",
          "from": 5,
          "to": 8
        },
        {
          "label": "B",
          "from": 9,
          "to": 12
        },
        {
          "label": "A2",
          "from": 13,
          "to": 16
        },
        {
          "label": "Cả bài",
          "from": 1,
          "to": 16
        }
      ],
      "book": {
        "id": "pieces-18",
        "label": "18 tiểu phẩm · Những ngày êm đềm",
        "chapter": 2,
        "sourceNumber": 6,
        "pages": [
          19,
          18
        ],
        "kind": "transcribed",
        "reference": "Tiểu phẩm 06 · đủ 16 ô · trang sheet và trang học",
        "musicxml": "assets/books/pieces18-sources/06_piece.musicxml",
        "midi": {
          "both": "assets/books/pieces18-sources/06_both_hands.mid",
          "right": "assets/books/pieces18-sources/06_right_hand.mid",
          "left": "assets/books/pieces18-sources/06_left_hand.mid"
        },
        "repair": "Sửa đúng một lỗi; luyện ô lỗi cùng ô trước/sau, rồi nối lại câu. Nếu chưa ổn, giảm 4–8 BPM.",
        "repairLessons": [
          135,
          138,
          151
        ],
        "steps": [
          "Nghe và ngân nga câu A; đọc rồi tập tay phải riêng ô 1–4.",
          "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
          "Chơi đủ 16 ô không dừng: giai điệu rõ, nền nhẹ, đúng nốt/trường độ và tay thoải mái. Giữ đủ nốt cuối rồi mới ngân thêm."
        ],
        "review": "Hôm sau chơi một lượt trước khi ôn. Tự ghi một lỗi nốt/nhịp và một mục tiêu âm thanh; chưa có kiểm tra tự động sau nghỉ."
      }
    },
    {
      "id": 161,
      "stage": 35,
      "title": "Dòng suối nhỏ",
      "bpm": 56,
      "meter": 4,
      "keySignature": "C",
      "rh": [
        [
          [
            "E4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "G4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 2
            }
          ],
          [
            "E4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "F4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "E4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "D4",
            1.0
          ],
          [
            "C4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "D4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "F4",
            1.0
          ],
          [
            "E4",
            1.0
          ],
          [
            "D4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "A4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 2
            }
          ],
          [
            "G4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 4
            }
          ],
          [
            "C4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "D4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "E4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "G4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 2
            }
          ],
          [
            "E4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "F4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C4",
            4.0,
            {
              "fermata": true,
              "finger": 1
            }
          ]
        ]
      ],
      "lh": [
        [
          [
            "C3",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E3",
            1.0
          ],
          [
            "G3",
            1.0
          ],
          [
            "E3",
            1.0
          ]
        ],
        [
          [
            "C3",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "F3",
            1.0
          ],
          [
            "A3",
            1.0
          ],
          [
            "F3",
            1.0
          ]
        ],
        [
          [
            "B2",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "D3",
            1.0
          ],
          [
            "G3",
            1.0
          ],
          [
            "D3",
            1.0
          ]
        ],
        [
          [
            "B2",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "D3",
            1.0
          ],
          [
            "G3",
            1.0
          ],
          [
            "D3",
            1.0
          ]
        ],
        [
          [
            "C3",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E3",
            1.0
          ],
          [
            "G3",
            1.0
          ],
          [
            "E3",
            1.0
          ]
        ],
        [
          [
            "D3",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "F3",
            1.0
          ],
          [
            "A3",
            1.0
          ],
          [
            "F3",
            1.0
          ]
        ],
        [
          [
            "B2",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "D3",
            1.0
          ],
          [
            "G3",
            1.0
          ],
          [
            "D3",
            1.0
          ]
        ],
        [
          [
            "C3",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E3",
            1.0
          ],
          [
            "G3",
            1.0
          ],
          [
            "E3",
            1.0
          ]
        ],
        [
          [
            "C3",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E3",
            1.0
          ],
          [
            "A3",
            1.0
          ],
          [
            "E3",
            1.0
          ]
        ],
        [
          [
            "C3",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "F3",
            1.0
          ],
          [
            "A3",
            1.0
          ],
          [
            "F3",
            1.0
          ]
        ],
        [
          [
            "D3",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "F3",
            1.0
          ],
          [
            "A3",
            1.0
          ],
          [
            "F3",
            1.0
          ]
        ],
        [
          [
            "B2",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "D3",
            1.0
          ],
          [
            "G3",
            1.0
          ],
          [
            "D3",
            1.0
          ]
        ],
        [
          [
            "C3",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E3",
            1.0
          ],
          [
            "G3",
            1.0
          ],
          [
            "E3",
            1.0
          ]
        ],
        [
          [
            "C3",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "F3",
            1.0
          ],
          [
            "A3",
            1.0
          ],
          [
            "F3",
            1.0
          ]
        ],
        [
          [
            "B2",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "D3",
            1.0
          ],
          [
            "G3",
            1.0
          ],
          [
            "D3",
            1.0
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            4.0,
            {
              "fermata": true,
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ]
      ],
      "harmony": [
        "C",
        "F/C",
        "G/B",
        "G/B",
        "C",
        "Dm",
        "G/B",
        "C",
        "Am/C",
        "F/C",
        "Dm",
        "G/B",
        "C",
        "F/C",
        "G/B",
        "C"
      ],
      "phraseMarkers": [
        "A",
        null,
        null,
        null,
        "A1",
        null,
        null,
        null,
        "B",
        null,
        null,
        null,
        "A2",
        null,
        null,
        null
      ],
      "dynamicChanges": [
        [
          {
            "hand": "rh",
            "value": "mp"
          },
          {
            "hand": "lh",
            "value": "p"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "value": "mf"
          }
        ],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "value": "mp"
          }
        ],
        [],
        [
          {
            "hand": "rh",
            "value": "p"
          }
        ],
        []
      ],
      "expressionWords": [
        [
          {
            "hand": "rh",
            "text": "Dolce / BPM 56"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "text": "dim."
          }
        ],
        []
      ],
      "studyLabels": [
        "A · C · P mp · T p",
        "F/C",
        "G/B",
        "G/B",
        "A1 · C",
        "Dm",
        "G/B",
        "C",
        "B · Am/C · P mf",
        "F/C",
        "Dm",
        "G/B",
        "A2 · C · P mp",
        "F/C",
        "G/B · P p · dim.",
        "C"
      ],
      "performance": {
        "rh": {
          "gainByBar": [
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            1.05,
            1.05,
            1.05,
            1.05,
            0.85,
            0.85,
            0.6,
            0.6
          ],
          "gate": 0.98
        },
        "lh": {
          "gainByBar": [
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6
          ],
          "gate": 0.98
        }
      },
      "goal": "Trái rải đều, phải hát liền câu",
      "focus": "Trái thấp-giữa-cao-giữa; nhả từng nốt tự nhiên, đừng làm phần đệm quá lớn.",
      "pass_rule": "Chơi đủ 16 ô ở tốc độ bạn giữ được (từ 40 BPM), đúng nốt và nhịp, tiếng hát rõ hơn nền; tự kiểm tra trên đàn.",
      "variation": "Ngân nga khi tay kia đệm. Thử A nhỏ, B rõ hơn rồi trở lại A cùng tốc độ; hôm sau kiểm tra trước khi ôn.",
      "fingers": "Chỉ hiện số ngón nguồn ở điểm vào/đổi thế; chỗ không ghi số cần giữ thế tay phù hợp.",
      "touch": "Dolce: dịu và có hướng câu; p/mp/mf theo sheet. Đếm đủ nốt cuối trước khi ngân; pedal chỉ thêm khi nốt và nhịp đã ổn.",
      "mission": {
        "title": "Dòng suối nhỏ",
        "hand": "rh",
        "range": [
          1,
          4
        ],
        "duoRange": [
          7,
          9
        ],
        "solo": "Nghe và ngân nga câu A; đọc rồi tập tay phải riêng ô 1–4.",
        "duo": "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
        "finalTempo": 40,
        "finalBpm": 56,
        "labels": [
          "Nghe & học câu A",
          "Nối A1 vào B",
          "Chơi đủ 16 ô"
        ]
      },
      "phrases": [
        {
          "label": "A",
          "from": 1,
          "to": 4
        },
        {
          "label": "A1",
          "from": 5,
          "to": 8
        },
        {
          "label": "B",
          "from": 9,
          "to": 12
        },
        {
          "label": "A2",
          "from": 13,
          "to": 16
        },
        {
          "label": "Cả bài",
          "from": 1,
          "to": 16
        }
      ],
      "book": {
        "id": "pieces-18",
        "label": "18 tiểu phẩm · Những ngày êm đềm",
        "chapter": 3,
        "sourceNumber": 7,
        "pages": [
          21,
          20
        ],
        "kind": "transcribed",
        "reference": "Tiểu phẩm 07 · đủ 16 ô · trang sheet và trang học",
        "musicxml": "assets/books/pieces18-sources/07_piece.musicxml",
        "midi": {
          "both": "assets/books/pieces18-sources/07_both_hands.mid",
          "right": "assets/books/pieces18-sources/07_right_hand.mid",
          "left": "assets/books/pieces18-sources/07_left_hand.mid"
        },
        "repair": "Sửa đúng một lỗi; luyện ô lỗi cùng ô trước/sau, rồi nối lại câu. Nếu chưa ổn, giảm 4–8 BPM.",
        "repairLessons": [
          140,
          143,
          151
        ],
        "steps": [
          "Nghe và ngân nga câu A; đọc rồi tập tay phải riêng ô 1–4.",
          "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
          "Chơi đủ 16 ô không dừng: giai điệu rõ, nền nhẹ, đúng nốt/trường độ và tay thoải mái. Giữ đủ nốt cuối rồi mới ngân thêm."
        ],
        "review": "Hôm sau chơi một lượt trước khi ôn. Tự ghi một lỗi nốt/nhịp và một mục tiêu âm thanh; chưa có kiểm tra tự động sau nghỉ."
      }
    },
    {
      "id": 162,
      "stage": 35,
      "title": "Giọt sương trên lá",
      "bpm": 56,
      "meter": 4,
      "keySignature": "C",
      "rh": [
        [
          [
            "C4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "G4",
            1.0
          ],
          [
            "E4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ]
            }
          ],
          [
            "F4",
            1.0
          ],
          [
            "A4",
            1.0
          ],
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "F4",
            1.0
          ],
          [
            "G4",
            1.0
          ],
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "E4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "G4",
            1.0
          ],
          [
            "E4",
            1.0
          ],
          [
            "C4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "A4",
            1.0
          ],
          [
            "F4",
            1.0
          ],
          [
            "D4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "F4",
            1.0
          ],
          [
            "D4",
            1.0
          ],
          [
            "B3",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "E4",
            0.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "A4",
            0.5
          ],
          [
            "G4",
            0.5
          ],
          [
            "E4",
            0.5
          ],
          [
            "A4",
            1.0
          ],
          [
            "G4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C4",
            0.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ]
            }
          ],
          [
            "F4",
            0.5
          ],
          [
            "A4",
            0.5
          ],
          [
            "F4",
            0.5
          ],
          [
            "E4",
            1.0
          ],
          [
            "C4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            0.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "F4",
            0.5
          ],
          [
            "G4",
            0.5
          ],
          [
            "F4",
            0.5
          ],
          [
            "E4",
            1.0
          ],
          [
            "D4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "C4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "G4",
            1.0
          ],
          [
            "E4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ]
            }
          ],
          [
            "F4",
            1.0
          ],
          [
            "A4",
            1.0
          ],
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "F4",
            1.0
          ],
          [
            "G4",
            1.0
          ],
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C4",
            4.0,
            {
              "fermata": true,
              "finger": 1
            }
          ]
        ]
      ],
      "lh": [
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "F3",
              "A3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "D3",
              "F3",
              "A3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "A3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "F3",
              "A3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "D3",
              "F3",
              "A3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "F3",
              "A3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            4.0,
            {
              "fermata": true,
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ]
      ],
      "harmony": [
        "C",
        "F/C",
        "G/B",
        "G/B",
        "C",
        "Dm",
        "G/B",
        "C",
        "Am/C",
        "F/C",
        "Dm",
        "G/B",
        "C",
        "F/C",
        "G/B",
        "C"
      ],
      "phraseMarkers": [
        "A",
        null,
        null,
        null,
        "A1",
        null,
        null,
        null,
        "B",
        null,
        null,
        null,
        "A2",
        null,
        null,
        null
      ],
      "dynamicChanges": [
        [
          {
            "hand": "rh",
            "value": "mp"
          },
          {
            "hand": "lh",
            "value": "p"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "value": "mf"
          }
        ],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "value": "mp"
          }
        ],
        [],
        [
          {
            "hand": "rh",
            "value": "p"
          }
        ],
        []
      ],
      "expressionWords": [
        [
          {
            "hand": "rh",
            "text": "Dolce / BPM 56"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "text": "dim."
          }
        ],
        []
      ],
      "studyLabels": [
        "A · C · P mp · T p",
        "F/C",
        "G/B",
        "G/B",
        "A1 · C",
        "Dm",
        "G/B",
        "C",
        "B · Am/C · P mf",
        "F/C",
        "Dm",
        "G/B",
        "A2 · C · P mp",
        "F/C",
        "G/B · P p · dim.",
        "C"
      ],
      "performance": {
        "rh": {
          "gainByBar": [
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            1.05,
            1.05,
            1.05,
            1.05,
            0.85,
            0.85,
            0.6,
            0.6
          ],
          "gate": 0.98
        },
        "lh": {
          "gainByBar": [
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6
          ],
          "gate": 0.98
        }
      },
      "goal": "Giai điệu từ hợp âm rải ở tay phải",
      "focus": "Bắt đầu rải nốt đen; chỉ đoạn B có vài móc đơn. Nốt đích cuối câu nhẹ hơn.",
      "pass_rule": "Chơi đủ 16 ô ở tốc độ bạn giữ được (từ 40 BPM), đúng nốt và nhịp, tiếng hát rõ hơn nền; tự kiểm tra trên đàn.",
      "variation": "Ngân nga khi tay kia đệm. Thử A nhỏ, B rõ hơn rồi trở lại A cùng tốc độ; hôm sau kiểm tra trước khi ôn.",
      "fingers": "Chỉ hiện số ngón nguồn ở điểm vào/đổi thế; chỗ không ghi số cần giữ thế tay phù hợp.",
      "touch": "Dolce: dịu và có hướng câu; p/mp/mf theo sheet. Đếm đủ nốt cuối trước khi ngân; pedal chỉ thêm khi nốt và nhịp đã ổn.",
      "mission": {
        "title": "Giọt sương trên lá",
        "hand": "rh",
        "range": [
          1,
          4
        ],
        "duoRange": [
          7,
          9
        ],
        "solo": "Nghe và ngân nga câu A; đọc rồi tập tay phải riêng ô 1–4.",
        "duo": "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
        "finalTempo": 40,
        "finalBpm": 56,
        "labels": [
          "Nghe & học câu A",
          "Nối A1 vào B",
          "Chơi đủ 16 ô"
        ]
      },
      "phrases": [
        {
          "label": "A",
          "from": 1,
          "to": 4
        },
        {
          "label": "A1",
          "from": 5,
          "to": 8
        },
        {
          "label": "B",
          "from": 9,
          "to": 12
        },
        {
          "label": "A2",
          "from": 13,
          "to": 16
        },
        {
          "label": "Cả bài",
          "from": 1,
          "to": 16
        }
      ],
      "book": {
        "id": "pieces-18",
        "label": "18 tiểu phẩm · Những ngày êm đềm",
        "chapter": 3,
        "sourceNumber": 8,
        "pages": [
          23,
          22
        ],
        "kind": "transcribed",
        "reference": "Tiểu phẩm 08 · đủ 16 ô · trang sheet và trang học",
        "musicxml": "assets/books/pieces18-sources/08_piece.musicxml",
        "midi": {
          "both": "assets/books/pieces18-sources/08_both_hands.mid",
          "right": "assets/books/pieces18-sources/08_right_hand.mid",
          "left": "assets/books/pieces18-sources/08_left_hand.mid"
        },
        "repair": "Sửa đúng một lỗi; luyện ô lỗi cùng ô trước/sau, rồi nối lại câu. Nếu chưa ổn, giảm 4–8 BPM.",
        "repairLessons": [
          139,
          143,
          146
        ],
        "steps": [
          "Nghe và ngân nga câu A; đọc rồi tập tay phải riêng ô 1–4.",
          "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
          "Chơi đủ 16 ô không dừng: giai điệu rõ, nền nhẹ, đúng nốt/trường độ và tay thoải mái. Giữ đủ nốt cuối rồi mới ngân thêm."
        ],
        "review": "Hôm sau chơi một lượt trước khi ôn. Tự ghi một lỗi nốt/nhịp và một mục tiêu âm thanh; chưa có kiểm tra tự động sau nghỉ."
      }
    },
    {
      "id": 163,
      "stage": 35,
      "title": "Hai dòng sông",
      "bpm": 56,
      "meter": 4,
      "keySignature": "C",
      "rh": [
        [
          [
            "C4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "G4",
            1.0
          ],
          [
            "E4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ]
            }
          ],
          [
            "F4",
            1.0
          ],
          [
            "A4",
            1.0
          ],
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "B3",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ]
            }
          ],
          [
            "D4",
            1.0
          ],
          [
            "G4",
            1.0
          ],
          [
            "D4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "E4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "G4",
            1.0
          ],
          [
            "E4",
            1.0
          ],
          [
            "C4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ]
            }
          ],
          [
            "A4",
            1.0
          ],
          [
            "F4",
            1.0
          ],
          [
            "C4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "G4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ]
            }
          ],
          [
            "F4",
            1.0
          ],
          [
            "D4",
            1.0
          ],
          [
            "B3",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "A4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ]
            }
          ],
          [
            "G4",
            1.0
          ],
          [
            "E4",
            1.0
          ],
          [
            "C4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "A4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ]
            }
          ],
          [
            "F4",
            1.0
          ],
          [
            "E4",
            1.0
          ],
          [
            "C4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "G4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ]
            }
          ],
          [
            "F4",
            1.0
          ],
          [
            "D4",
            1.0
          ],
          [
            "B3",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "C4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "G4",
            1.0
          ],
          [
            "E4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ]
            }
          ],
          [
            "F4",
            1.0
          ],
          [
            "A4",
            1.0
          ],
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "B3",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ]
            }
          ],
          [
            "D4",
            1.0
          ],
          [
            "G4",
            1.0
          ],
          [
            "D4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C4",
            4.0,
            {
              "fermata": true,
              "finger": 1
            }
          ]
        ]
      ],
      "lh": [
        [
          [
            "C3",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E3",
            1.0
          ],
          [
            "G3",
            1.0
          ],
          [
            "E3",
            1.0
          ]
        ],
        [
          [
            "C3",
            1.0
          ],
          [
            "F3",
            1.0
          ],
          [
            "A3",
            1.0
          ],
          [
            "F3",
            1.0
          ]
        ],
        [
          [
            "B2",
            1.0
          ],
          [
            "D3",
            1.0
          ],
          [
            "G3",
            1.0
          ],
          [
            "D3",
            1.0
          ]
        ],
        [
          [
            "D3",
            4.0,
            {
              "finger": 5
            }
          ]
        ],
        [
          [
            "E3",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            1.0
          ],
          [
            "E3",
            1.0
          ],
          [
            "C3",
            1.0
          ]
        ],
        [
          [
            "F3",
            1.0
          ],
          [
            "A3",
            1.0
          ],
          [
            "F3",
            1.0
          ],
          [
            "C3",
            1.0
          ]
        ],
        [
          [
            "G3",
            1.0
          ],
          [
            "F3",
            1.0
          ],
          [
            "D3",
            1.0
          ],
          [
            "B2",
            1.0
          ]
        ],
        [
          [
            "C3",
            4.0,
            {
              "finger": 5
            }
          ]
        ],
        [
          [
            "C3",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E3",
            1.0
          ],
          [
            "A3",
            1.0
          ],
          [
            "E3",
            1.0
          ]
        ],
        [
          [
            "C3",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "F3",
            1.0
          ],
          [
            "A3",
            1.0
          ],
          [
            "F3",
            1.0
          ]
        ],
        [
          [
            "D3",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "F3",
            1.0
          ],
          [
            "A3",
            1.0
          ],
          [
            "F3",
            1.0
          ]
        ],
        [
          [
            "B2",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "D3",
            1.0
          ],
          [
            "G3",
            1.0
          ],
          [
            "D3",
            1.0
          ]
        ],
        [
          [
            "C3",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E3",
            1.0
          ],
          [
            "G3",
            1.0
          ],
          [
            "E3",
            1.0
          ]
        ],
        [
          [
            "C3",
            1.0
          ],
          [
            "F3",
            1.0
          ],
          [
            "A3",
            1.0
          ],
          [
            "F3",
            1.0
          ]
        ],
        [
          [
            "B2",
            1.0
          ],
          [
            "D3",
            1.0
          ],
          [
            "G3",
            1.0
          ],
          [
            "D3",
            1.0
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            4.0,
            {
              "fermata": true,
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ]
      ],
      "harmony": [
        "C",
        "F/C",
        "G/B",
        "G/B",
        "C",
        "Dm",
        "G/B",
        "C",
        "Am/C",
        "F/C",
        "Dm",
        "G/B",
        "C",
        "F/C",
        "G/B",
        "C"
      ],
      "phraseMarkers": [
        "A",
        null,
        null,
        null,
        "A1",
        null,
        null,
        null,
        "B",
        null,
        null,
        null,
        "A2",
        null,
        null,
        null
      ],
      "dynamicChanges": [
        [
          {
            "hand": "rh",
            "value": "mp"
          },
          {
            "hand": "lh",
            "value": "p"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "value": "mf"
          }
        ],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "value": "mp"
          }
        ],
        [],
        [
          {
            "hand": "rh",
            "value": "p"
          }
        ],
        []
      ],
      "expressionWords": [
        [
          {
            "hand": "rh",
            "text": "Dolce / BPM 56"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "text": "dim."
          }
        ],
        []
      ],
      "studyLabels": [
        "A · C · P mp · T p",
        "F/C",
        "G/B",
        "G/B",
        "A1 · C",
        "Dm",
        "G/B",
        "C",
        "B · Am/C · P mf",
        "F/C",
        "Dm",
        "G/B",
        "A2 · C · P mp",
        "F/C",
        "G/B · P p · dim.",
        "C"
      ],
      "performance": {
        "rh": {
          "gainByBar": [
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            1.05,
            1.05,
            1.05,
            1.05,
            0.85,
            0.85,
            0.6,
            0.6
          ],
          "gate": 0.98
        },
        "lh": {
          "gainByBar": [
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6
          ],
          "gate": 0.98
        }
      },
      "goal": "Song song và ngược hướng qua mô-típ rải",
      "focus": "Ô 1-8: hai tay cùng hướng chủ yếu; ô 9-12: trái đi lên khi phải đi xuống. Cuối bài về C.",
      "pass_rule": "Chơi đủ 16 ô ở tốc độ bạn giữ được (từ 40 BPM), đúng nốt và nhịp, tiếng hát rõ hơn nền; tự kiểm tra trên đàn.",
      "variation": "Ngân nga khi tay kia đệm. Thử A nhỏ, B rõ hơn rồi trở lại A cùng tốc độ; hôm sau kiểm tra trước khi ôn.",
      "fingers": "Chỉ hiện số ngón nguồn ở điểm vào/đổi thế; chỗ không ghi số cần giữ thế tay phù hợp.",
      "touch": "Dolce: dịu và có hướng câu; p/mp/mf theo sheet. Đếm đủ nốt cuối trước khi ngân; pedal chỉ thêm khi nốt và nhịp đã ổn.",
      "mission": {
        "title": "Hai dòng sông",
        "hand": "rh",
        "range": [
          1,
          4
        ],
        "duoRange": [
          7,
          9
        ],
        "solo": "Nghe và ngân nga câu A; đọc rồi tập tay phải riêng ô 1–4.",
        "duo": "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
        "finalTempo": 40,
        "finalBpm": 56,
        "labels": [
          "Nghe & học câu A",
          "Nối A1 vào B",
          "Chơi đủ 16 ô"
        ]
      },
      "phrases": [
        {
          "label": "A",
          "from": 1,
          "to": 4
        },
        {
          "label": "A1",
          "from": 5,
          "to": 8
        },
        {
          "label": "B",
          "from": 9,
          "to": 12
        },
        {
          "label": "A2",
          "from": 13,
          "to": 16
        },
        {
          "label": "Cả bài",
          "from": 1,
          "to": 16
        }
      ],
      "book": {
        "id": "pieces-18",
        "label": "18 tiểu phẩm · Những ngày êm đềm",
        "chapter": 3,
        "sourceNumber": 9,
        "pages": [
          25,
          24
        ],
        "kind": "transcribed",
        "reference": "Tiểu phẩm 09 · đủ 16 ô · trang sheet và trang học",
        "musicxml": "assets/books/pieces18-sources/09_piece.musicxml",
        "midi": {
          "both": "assets/books/pieces18-sources/09_both_hands.mid",
          "right": "assets/books/pieces18-sources/09_right_hand.mid",
          "left": "assets/books/pieces18-sources/09_left_hand.mid"
        },
        "repair": "Sửa đúng một lỗi; luyện ô lỗi cùng ô trước/sau, rồi nối lại câu. Nếu chưa ổn, giảm 4–8 BPM.",
        "repairLessons": [
          141,
          142
        ],
        "steps": [
          "Nghe và ngân nga câu A; đọc rồi tập tay phải riêng ô 1–4.",
          "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
          "Chơi đủ 16 ô không dừng: giai điệu rõ, nền nhẹ, đúng nốt/trường độ và tay thoải mái. Giữ đủ nốt cuối rồi mới ngân thêm."
        ],
        "review": "Hôm sau chơi một lượt trước khi ôn. Tự ghi một lỗi nốt/nhịp và một mục tiêu âm thanh; chưa có kiểm tra tự động sau nghỉ."
      }
    },
    {
      "id": 164,
      "stage": 36,
      "title": "Lời ru chậm",
      "bpm": 56,
      "meter": 4,
      "keySignature": "C",
      "rh": [
        [
          [
            "E4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "D4",
            1.0
          ],
          [
            "C4",
            1.0
          ],
          [
            "E4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 4
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "C4",
            1.0
          ],
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "F4",
            1.0
          ],
          [
            "D4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "E4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "D4",
            1.0
          ],
          [
            "C4",
            1.0
          ],
          [
            "D4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 4
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "D4",
            1.0
          ],
          [
            "C4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "F4",
            1.0
          ],
          [
            "E4",
            1.0
          ],
          [
            "D4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "E4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "G4",
            1.0
          ],
          [
            "A4",
            1.0
          ],
          [
            "G4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 4
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "C4",
            1.0
          ],
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "D4",
            1.0
          ],
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "E4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "D4",
            1.0
          ],
          [
            "C4",
            1.0
          ],
          [
            "E4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 4
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "C4",
            1.0
          ],
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "F4",
            1.0
          ],
          [
            "D4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C4",
            4.0,
            {
              "fermata": true,
              "finger": 1
            }
          ]
        ]
      ],
      "lh": [
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ],
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "F3",
              "A3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ],
          [
            [
              "C3",
              "F3",
              "A3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ],
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ],
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ],
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "D3",
              "F3",
              "A3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ],
          [
            [
              "D3",
              "F3",
              "A3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ],
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ],
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "A3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ],
          [
            [
              "C3",
              "E3",
              "A3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "F3",
              "A3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ],
          [
            [
              "C3",
              "F3",
              "A3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "D3",
              "F3",
              "A3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ],
          [
            [
              "D3",
              "F3",
              "A3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ],
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ],
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "F3",
              "A3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ],
          [
            [
              "C3",
              "F3",
              "A3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ],
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            4.0,
            {
              "fermata": true,
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ]
      ],
      "harmony": [
        "C",
        "F/C",
        "G/B",
        "G/B",
        "C",
        "Dm",
        "G/B",
        "C",
        "Am/C",
        "F/C",
        "Dm",
        "G/B",
        "C",
        "F/C",
        "G/B",
        "C"
      ],
      "phraseMarkers": [
        "A",
        null,
        null,
        null,
        "A1",
        null,
        null,
        null,
        "B",
        null,
        null,
        null,
        "A2",
        null,
        null,
        null
      ],
      "dynamicChanges": [
        [
          {
            "hand": "rh",
            "value": "mp"
          },
          {
            "hand": "lh",
            "value": "p"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "value": "mf"
          }
        ],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "value": "mp"
          }
        ],
        [],
        [
          {
            "hand": "rh",
            "value": "p"
          }
        ],
        []
      ],
      "expressionWords": [
        [
          {
            "hand": "rh",
            "text": "Dolce / BPM 56"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "text": "dim."
          }
        ],
        []
      ],
      "studyLabels": [
        "A · C · P mp · T p",
        "F/C",
        "G/B",
        "G/B",
        "A1 · C",
        "Dm",
        "G/B",
        "C",
        "B · Am/C · P mf",
        "F/C",
        "Dm",
        "G/B",
        "A2 · C · P mp",
        "F/C",
        "G/B · P p · dim.",
        "C"
      ],
      "performance": {
        "rh": {
          "gainByBar": [
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            1.05,
            1.05,
            1.05,
            1.05,
            0.85,
            0.85,
            0.6,
            0.6
          ],
          "gate": 0.98
        },
        "lh": {
          "gainByBar": [
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6
          ],
          "gate": 0.98
        }
      },
      "goal": "Hai nốt trắng trái trên bốn nốt đen phải",
      "focus": "Trái chỉ vào ở phách 1 và 3. Không nhả nốt trái theo mỗi nốt phải.",
      "pass_rule": "Chơi đủ 16 ô ở tốc độ bạn giữ được (từ 40 BPM), đúng nốt và nhịp, tiếng hát rõ hơn nền; tự kiểm tra trên đàn.",
      "variation": "Ngân nga khi tay kia đệm. Thử A nhỏ, B rõ hơn rồi trở lại A cùng tốc độ; hôm sau kiểm tra trước khi ôn.",
      "fingers": "Chỉ hiện số ngón nguồn ở điểm vào/đổi thế; chỗ không ghi số cần giữ thế tay phù hợp.",
      "touch": "Dolce: dịu và có hướng câu; p/mp/mf theo sheet. Đếm đủ nốt cuối trước khi ngân; pedal chỉ thêm khi nốt và nhịp đã ổn.",
      "mission": {
        "title": "Lời ru chậm",
        "hand": "rh",
        "range": [
          1,
          4
        ],
        "duoRange": [
          7,
          9
        ],
        "solo": "Nghe và ngân nga câu A; đọc rồi tập tay phải riêng ô 1–4.",
        "duo": "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
        "finalTempo": 40,
        "finalBpm": 56,
        "labels": [
          "Nghe & học câu A",
          "Nối A1 vào B",
          "Chơi đủ 16 ô"
        ]
      },
      "phrases": [
        {
          "label": "A",
          "from": 1,
          "to": 4
        },
        {
          "label": "A1",
          "from": 5,
          "to": 8
        },
        {
          "label": "B",
          "from": 9,
          "to": 12
        },
        {
          "label": "A2",
          "from": 13,
          "to": 16
        },
        {
          "label": "Cả bài",
          "from": 1,
          "to": 16
        }
      ],
      "book": {
        "id": "pieces-18",
        "label": "18 tiểu phẩm · Những ngày êm đềm",
        "chapter": 4,
        "sourceNumber": 10,
        "pages": [
          27,
          26
        ],
        "kind": "transcribed",
        "reference": "Tiểu phẩm 10 · đủ 16 ô · trang sheet và trang học",
        "musicxml": "assets/books/pieces18-sources/10_piece.musicxml",
        "midi": {
          "both": "assets/books/pieces18-sources/10_both_hands.mid",
          "right": "assets/books/pieces18-sources/10_right_hand.mid",
          "left": "assets/books/pieces18-sources/10_left_hand.mid"
        },
        "repair": "Sửa đúng một lỗi; luyện ô lỗi cùng ô trước/sau, rồi nối lại câu. Nếu chưa ổn, giảm 4–8 BPM.",
        "repairLessons": [
          143,
          145,
          151
        ],
        "steps": [
          "Nghe và ngân nga câu A; đọc rồi tập tay phải riêng ô 1–4.",
          "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
          "Chơi đủ 16 ô không dừng: giai điệu rõ, nền nhẹ, đúng nốt/trường độ và tay thoải mái. Giữ đủ nốt cuối rồi mới ngân thêm."
        ],
        "review": "Hôm sau chơi một lượt trước khi ôn. Tự ghi một lỗi nốt/nhịp và một mục tiêu âm thanh; chưa có kiểm tra tự động sau nghỉ."
      }
    },
    {
      "id": 165,
      "stage": 36,
      "title": "Bức thư chưa gửi",
      "bpm": 56,
      "meter": 4,
      "keySignature": "C",
      "rh": [
        [
          [
            "C5",
            1.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "B4",
            0.5
          ],
          [
            "A4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D5",
            1.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "C5",
            0.5
          ],
          [
            "B4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "B4",
            1.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "C5",
            0.5
          ],
          [
            "B4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "B4",
            2.0,
            {
              "tie": "start",
              "finger": 2
            }
          ],
          [
            "B4",
            2.0,
            {
              "tie": "stop"
            }
          ]
        ],
        [
          [
            "C5",
            1.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "E5",
            0.5
          ],
          [
            "C5",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D5",
            1.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "C5",
            0.5
          ],
          [
            "B4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "B4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "G4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "A4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "F5",
            1.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 4
            }
          ],
          [
            "E5",
            0.5
          ],
          [
            "C5",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D5",
            1.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 4
            }
          ],
          [
            "C5",
            0.5
          ],
          [
            "A4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "B4",
            1.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "C5",
            0.5
          ],
          [
            "D5",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "B4",
            2.0,
            {
              "tie": "start",
              "finger": 2
            }
          ],
          [
            "B4",
            2.0,
            {
              "tie": "stop"
            }
          ]
        ],
        [
          [
            "C5",
            1.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "B4",
            0.5
          ],
          [
            "A4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D5",
            1.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "C5",
            0.5
          ],
          [
            "B4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "B4",
            1.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "C5",
            0.5
          ],
          [
            "B4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "A4",
            4.0,
            {
              "fermata": true,
              "finger": 1
            }
          ]
        ]
      ],
      "lh": [
        [
          [
            [
              "A2",
              "C3",
              "E3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "A2",
              "D3",
              "F3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "G2",
              "B2",
              "E3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "G2",
              "B2",
              "E3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "A2",
              "C3",
              "E3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "A2",
              "D3",
              "F3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "G2",
              "B2",
              "E3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "A2",
              "C3",
              "E3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "A2",
              "C3",
              "F3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "A2",
              "D3",
              "F3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "G2",
              "B2",
              "E3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "G2",
              "B2",
              "E3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "A2",
              "C3",
              "E3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "A2",
              "D3",
              "F3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "G2",
              "B2",
              "E3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "A2",
              "C3",
              "E3"
            ],
            4.0,
            {
              "fermata": true,
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ]
      ],
      "harmony": [
        "Am",
        "Dm/A",
        "Em/G",
        "Em/G",
        "Am",
        "Dm/A",
        "Em/G",
        "Am",
        "F/A",
        "Dm/A",
        "Em/G",
        "Em/G",
        "Am",
        "Dm/A",
        "Em/G",
        "Am"
      ],
      "phraseMarkers": [
        "A",
        null,
        null,
        null,
        "A1",
        null,
        null,
        null,
        "B",
        null,
        null,
        null,
        "A2",
        null,
        null,
        null
      ],
      "dynamicChanges": [
        [
          {
            "hand": "rh",
            "value": "mp"
          },
          {
            "hand": "lh",
            "value": "p"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "value": "mf"
          }
        ],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "value": "mp"
          }
        ],
        [],
        [
          {
            "hand": "rh",
            "value": "p"
          }
        ],
        []
      ],
      "expressionWords": [
        [
          {
            "hand": "rh",
            "text": "Dolce / BPM 56"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "text": "dim."
          }
        ],
        []
      ],
      "studyLabels": [
        "A · Am · P mp · T p",
        "Dm/A",
        "Em/G",
        "Em/G",
        "A1 · Am",
        "Dm/A",
        "Em/G",
        "Am",
        "B · F/A · P mf",
        "Dm/A",
        "Em/G",
        "Em/G",
        "A2 · Am · P mp",
        "Dm/A",
        "Em/G · P p · dim.",
        "Am"
      ],
      "performance": {
        "rh": {
          "gainByBar": [
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            1.05,
            1.05,
            1.05,
            1.05,
            0.85,
            0.85,
            0.6,
            0.6
          ],
          "gate": 0.98
        },
        "lh": {
          "gainByBar": [
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6
          ],
          "gate": 0.98
        }
      },
      "goal": "Nốt chấm dôi và dấu nối giữ tiếng",
      "focus": "Nốt đen chấm dôi = ba móc đơn; dấu nối giữ nguyên nốt, không đánh lại.",
      "pass_rule": "Chơi đủ 16 ô ở tốc độ bạn giữ được (từ 40 BPM), đúng nốt và nhịp, tiếng hát rõ hơn nền; tự kiểm tra trên đàn.",
      "variation": "Ngân nga khi tay kia đệm. Thử A nhỏ, B rõ hơn rồi trở lại A cùng tốc độ; hôm sau kiểm tra trước khi ôn.",
      "fingers": "Chỉ hiện số ngón nguồn ở điểm vào/đổi thế; chỗ không ghi số cần giữ thế tay phù hợp.",
      "touch": "Dolce: dịu và có hướng câu; p/mp/mf theo sheet. Đếm đủ nốt cuối trước khi ngân; pedal chỉ thêm khi nốt và nhịp đã ổn.",
      "mission": {
        "title": "Bức thư chưa gửi",
        "hand": "rh",
        "range": [
          1,
          4
        ],
        "duoRange": [
          7,
          9
        ],
        "solo": "Nghe và ngân nga câu A; đọc rồi tập tay phải riêng ô 1–4.",
        "duo": "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
        "finalTempo": 40,
        "finalBpm": 56,
        "labels": [
          "Nghe & học câu A",
          "Nối A1 vào B",
          "Chơi đủ 16 ô"
        ]
      },
      "phrases": [
        {
          "label": "A",
          "from": 1,
          "to": 4
        },
        {
          "label": "A1",
          "from": 5,
          "to": 8
        },
        {
          "label": "B",
          "from": 9,
          "to": 12
        },
        {
          "label": "A2",
          "from": 13,
          "to": 16
        },
        {
          "label": "Cả bài",
          "from": 1,
          "to": 16
        }
      ],
      "book": {
        "id": "pieces-18",
        "label": "18 tiểu phẩm · Những ngày êm đềm",
        "chapter": 4,
        "sourceNumber": 11,
        "pages": [
          29,
          28
        ],
        "kind": "transcribed",
        "reference": "Tiểu phẩm 11 · đủ 16 ô · trang sheet và trang học",
        "musicxml": "assets/books/pieces18-sources/11_piece.musicxml",
        "midi": {
          "both": "assets/books/pieces18-sources/11_both_hands.mid",
          "right": "assets/books/pieces18-sources/11_right_hand.mid",
          "left": "assets/books/pieces18-sources/11_left_hand.mid"
        },
        "repair": "Sửa đúng một lỗi; luyện ô lỗi cùng ô trước/sau, rồi nối lại câu. Nếu chưa ổn, giảm 4–8 BPM.",
        "repairLessons": [
          143,
          145,
          151
        ],
        "steps": [
          "Nghe và ngân nga câu A; đọc rồi tập tay phải riêng ô 1–4.",
          "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
          "Chơi đủ 16 ô không dừng: giai điệu rõ, nền nhẹ, đúng nốt/trường độ và tay thoải mái. Giữ đủ nốt cuối rồi mới ngân thêm."
        ],
        "review": "Hôm sau chơi một lượt trước khi ôn. Tự ghi một lỗi nốt/nhịp và một mục tiêu âm thanh; chưa có kiểm tra tự động sau nghỉ."
      }
    },
    {
      "id": 166,
      "stage": 36,
      "title": "Những hạt mưa",
      "bpm": 48,
      "meter": 4,
      "keySignature": "G",
      "rh": [
        [
          [
            "B4",
            0.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "A4",
            0.5
          ],
          [
            "G4",
            1.0
          ],
          [
            "A4",
            0.5
          ],
          [
            "B4",
            0.5
          ],
          [
            "D5",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C5",
            0.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 4
            }
          ],
          [
            "B4",
            0.5
          ],
          [
            "G4",
            1.0
          ],
          [
            "A4",
            0.5
          ],
          [
            "B4",
            0.5
          ],
          [
            "C5",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "A4",
            0.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "B4",
            0.5
          ],
          [
            "C5",
            1.0
          ],
          [
            "B4",
            0.5
          ],
          [
            "A4",
            0.5
          ],
          [
            "F#4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "A4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "B4",
            0.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "D5",
            0.5
          ],
          [
            "B4",
            1.0
          ],
          [
            "A4",
            0.5
          ],
          [
            "G4",
            0.5
          ],
          [
            "B4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C5",
            0.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "B4",
            0.5
          ],
          [
            "A4",
            1.0
          ],
          [
            "B4",
            0.5
          ],
          [
            "C5",
            0.5
          ],
          [
            "A4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "A4",
            0.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "B4",
            0.5
          ],
          [
            "C5",
            1.0
          ],
          [
            "B4",
            0.5
          ],
          [
            "A4",
            0.5
          ],
          [
            "F#4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "G4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "B4",
            0.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "D5",
            0.5
          ],
          [
            "E5",
            1.0
          ],
          [
            "D5",
            0.5
          ],
          [
            "B4",
            0.5
          ],
          [
            "E5",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C5",
            0.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 4
            }
          ],
          [
            "B4",
            0.5
          ],
          [
            "G4",
            1.0
          ],
          [
            "A4",
            0.5
          ],
          [
            "B4",
            0.5
          ],
          [
            "C5",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C5",
            0.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "B4",
            0.5
          ],
          [
            "A4",
            1.0
          ],
          [
            "B4",
            0.5
          ],
          [
            "C5",
            0.5
          ],
          [
            "A4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "A4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "B4",
            0.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "A4",
            0.5
          ],
          [
            "G4",
            1.0
          ],
          [
            "A4",
            0.5
          ],
          [
            "B4",
            0.5
          ],
          [
            "D5",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C5",
            0.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 4
            }
          ],
          [
            "B4",
            0.5
          ],
          [
            "G4",
            1.0
          ],
          [
            "A4",
            0.5
          ],
          [
            "B4",
            0.5
          ],
          [
            "C5",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "A4",
            0.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "B4",
            0.5
          ],
          [
            "C5",
            1.0
          ],
          [
            "B4",
            0.5
          ],
          [
            "A4",
            0.5
          ],
          [
            "F#4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "G4",
            4.0,
            {
              "fermata": true,
              "finger": 1
            }
          ]
        ]
      ],
      "lh": [
        [
          [
            [
              "G2",
              "B2",
              "D3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "G2",
              "C3",
              "E3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "F#2",
              "A2",
              "D3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "F#2",
              "A2",
              "D3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "G2",
              "B2",
              "D3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "A2",
              "C3",
              "E3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "F#2",
              "A2",
              "D3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "G2",
              "B2",
              "D3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "G2",
              "B2",
              "E3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "G2",
              "C3",
              "E3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "A2",
              "C3",
              "E3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "F#2",
              "A2",
              "D3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "G2",
              "B2",
              "D3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "G2",
              "C3",
              "E3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "F#2",
              "A2",
              "D3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "G2",
              "B2",
              "D3"
            ],
            4.0,
            {
              "fermata": true,
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ]
      ],
      "harmony": [
        "G",
        "C/G",
        "D/F#",
        "D/F#",
        "G",
        "Am",
        "D/F#",
        "G",
        "Em/G",
        "C/G",
        "Am",
        "D/F#",
        "G",
        "C/G",
        "D/F#",
        "G"
      ],
      "phraseMarkers": [
        "A",
        null,
        null,
        null,
        "A1",
        null,
        null,
        null,
        "B",
        null,
        null,
        null,
        "A2",
        null,
        null,
        null
      ],
      "dynamicChanges": [
        [
          {
            "hand": "rh",
            "value": "mp"
          },
          {
            "hand": "lh",
            "value": "p"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "value": "mf"
          }
        ],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "value": "mp"
          }
        ],
        [],
        [
          {
            "hand": "rh",
            "value": "p"
          }
        ],
        []
      ],
      "expressionWords": [
        [
          {
            "hand": "rh",
            "text": "Dolce / BPM 48"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "text": "dim."
          }
        ],
        []
      ],
      "studyLabels": [
        "A · G · P mp · T p",
        "C/G",
        "D/F#",
        "D/F#",
        "A1 · G",
        "Am",
        "D/F#",
        "G",
        "B · Em/G · P mf",
        "C/G",
        "Am",
        "D/F#",
        "A2 · G · P mp",
        "C/G",
        "D/F# · P p · dim.",
        "G"
      ],
      "performance": {
        "rh": {
          "gainByBar": [
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            1.05,
            1.05,
            1.05,
            1.05,
            0.85,
            0.85,
            0.6,
            0.6
          ],
          "gate": 0.98
        },
        "lh": {
          "gainByBar": [
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6
          ],
          "gate": 0.98
        }
      },
      "goal": "Móc đơn đều và đọc Fa thăng",
      "focus": "Mọi Fa trong giọng Sol trưởng đều là Fa thăng, kể cả Fa ở quãng tám khác.",
      "pass_rule": "Chơi đủ 16 ô ở tốc độ bạn giữ được (từ 40 BPM), đúng nốt và nhịp, tiếng hát rõ hơn nền; tự kiểm tra trên đàn.",
      "variation": "Ngân nga khi tay kia đệm. Thử A nhỏ, B rõ hơn rồi trở lại A cùng tốc độ; hôm sau kiểm tra trước khi ôn.",
      "fingers": "Chỉ hiện số ngón nguồn ở điểm vào/đổi thế; chỗ không ghi số cần giữ thế tay phù hợp.",
      "touch": "Dolce: dịu và có hướng câu; p/mp/mf theo sheet. Đếm đủ nốt cuối trước khi ngân; pedal chỉ thêm khi nốt và nhịp đã ổn.",
      "mission": {
        "title": "Những hạt mưa",
        "hand": "rh",
        "range": [
          1,
          4
        ],
        "duoRange": [
          7,
          9
        ],
        "solo": "Nghe và ngân nga câu A; đọc rồi tập tay phải riêng ô 1–4.",
        "duo": "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
        "finalTempo": 40,
        "finalBpm": 48,
        "labels": [
          "Nghe & học câu A",
          "Nối A1 vào B",
          "Chơi đủ 16 ô"
        ]
      },
      "phrases": [
        {
          "label": "A",
          "from": 1,
          "to": 4
        },
        {
          "label": "A1",
          "from": 5,
          "to": 8
        },
        {
          "label": "B",
          "from": 9,
          "to": 12
        },
        {
          "label": "A2",
          "from": 13,
          "to": 16
        },
        {
          "label": "Cả bài",
          "from": 1,
          "to": 16
        }
      ],
      "book": {
        "id": "pieces-18",
        "label": "18 tiểu phẩm · Những ngày êm đềm",
        "chapter": 4,
        "sourceNumber": 12,
        "pages": [
          31,
          30
        ],
        "kind": "transcribed",
        "reference": "Tiểu phẩm 12 · đủ 16 ô · trang sheet và trang học",
        "musicxml": "assets/books/pieces18-sources/12_piece.musicxml",
        "midi": {
          "both": "assets/books/pieces18-sources/12_both_hands.mid",
          "right": "assets/books/pieces18-sources/12_right_hand.mid",
          "left": "assets/books/pieces18-sources/12_left_hand.mid"
        },
        "repair": "Sửa đúng một lỗi; luyện ô lỗi cùng ô trước/sau, rồi nối lại câu. Nếu chưa ổn, giảm 4–8 BPM.",
        "repairLessons": [
          143,
          146,
          151
        ],
        "steps": [
          "Nghe và ngân nga câu A; đọc rồi tập tay phải riêng ô 1–4.",
          "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
          "Chơi đủ 16 ô không dừng: giai điệu rõ, nền nhẹ, đúng nốt/trường độ và tay thoải mái. Giữ đủ nốt cuối rồi mới ngân thêm."
        ],
        "review": "Hôm sau chơi một lượt trước khi ôn. Tự ghi một lỗi nốt/nhịp và một mục tiêu âm thanh; chưa có kiểm tra tự động sau nghỉ."
      }
    },
    {
      "id": 167,
      "stage": 37,
      "title": "Bước chân trên cỏ",
      "bpm": 56,
      "meter": 4,
      "keySignature": "C",
      "rh": [
        [
          [
            null,
            1.0
          ],
          [
            [
              "E4",
              "G4"
            ],
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ],
          [
            null,
            1.0
          ],
          [
            [
              "E4",
              "G4"
            ],
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ]
        ],
        [
          [
            null,
            1.0
          ],
          [
            [
              "F4",
              "A4"
            ],
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ],
          [
            null,
            1.0
          ],
          [
            [
              "F4",
              "A4"
            ],
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ]
        ],
        [
          [
            null,
            1.0
          ],
          [
            [
              "D4",
              "G4"
            ],
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                5
              ]
            }
          ],
          [
            null,
            1.0
          ],
          [
            [
              "D4",
              "F4"
            ],
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ]
        ],
        [
          [
            null,
            1.0
          ],
          [
            [
              "B3",
              "D4"
            ],
            3.0,
            {
              "fingers": [
                1,
                3
              ]
            }
          ]
        ],
        [
          [
            null,
            1.0
          ],
          [
            [
              "E4",
              "G4"
            ],
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ],
          [
            null,
            1.0
          ],
          [
            [
              "C4",
              "E4"
            ],
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ]
        ],
        [
          [
            null,
            1.0
          ],
          [
            [
              "D4",
              "F4"
            ],
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ],
          [
            null,
            1.0
          ],
          [
            [
              "D4",
              "F4"
            ],
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ]
        ],
        [
          [
            null,
            1.0
          ],
          [
            [
              "D4",
              "F4"
            ],
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ],
          [
            null,
            1.0
          ],
          [
            [
              "B3",
              "D4"
            ],
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ]
        ],
        [
          [
            [
              "A3",
              "C4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3
              ]
            }
          ]
        ],
        [
          [
            null,
            1.0
          ],
          [
            [
              "E4",
              "A4"
            ],
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                5
              ]
            }
          ],
          [
            null,
            1.0
          ],
          [
            [
              "E4",
              "A4"
            ],
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                5
              ]
            }
          ]
        ],
        [
          [
            null,
            1.0
          ],
          [
            [
              "F4",
              "A4"
            ],
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ],
          [
            null,
            1.0
          ],
          [
            [
              "C4",
              "F4"
            ],
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                5
              ]
            }
          ]
        ],
        [
          [
            null,
            1.0
          ],
          [
            [
              "D4",
              "F4"
            ],
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ],
          [
            null,
            1.0
          ],
          [
            [
              "B3",
              "D4"
            ],
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ]
        ],
        [
          [
            null,
            1.0
          ],
          [
            [
              "B3",
              "D4"
            ],
            3.0,
            {
              "fingers": [
                1,
                3
              ]
            }
          ]
        ],
        [
          [
            null,
            1.0
          ],
          [
            [
              "E4",
              "G4"
            ],
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ],
          [
            null,
            1.0
          ],
          [
            [
              "E4",
              "G4"
            ],
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ]
        ],
        [
          [
            null,
            1.0
          ],
          [
            [
              "F4",
              "A4"
            ],
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ],
          [
            null,
            1.0
          ],
          [
            [
              "F4",
              "A4"
            ],
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ]
        ],
        [
          [
            null,
            1.0
          ],
          [
            [
              "D4",
              "G4"
            ],
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                5
              ]
            }
          ],
          [
            null,
            1.0
          ],
          [
            [
              "D4",
              "F4"
            ],
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ]
        ],
        [
          [
            "C4",
            4.0,
            {
              "fermata": true,
              "finger": 1
            }
          ]
        ]
      ],
      "lh": [
        [
          [
            "C3",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            null,
            1.0
          ],
          [
            "G3",
            1.0
          ],
          [
            null,
            1.0
          ]
        ],
        [
          [
            "C3",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            null,
            1.0
          ],
          [
            "A3",
            1.0
          ],
          [
            null,
            1.0
          ]
        ],
        [
          [
            "B2",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            null,
            1.0
          ],
          [
            "G3",
            1.0
          ],
          [
            null,
            1.0
          ]
        ],
        [
          [
            "B2",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            null,
            1.0
          ],
          [
            "G3",
            1.0
          ],
          [
            null,
            1.0
          ]
        ],
        [
          [
            "C3",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            null,
            1.0
          ],
          [
            "G3",
            1.0
          ],
          [
            null,
            1.0
          ]
        ],
        [
          [
            "D3",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            null,
            1.0
          ],
          [
            "A3",
            1.0
          ],
          [
            null,
            1.0
          ]
        ],
        [
          [
            "B2",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            null,
            1.0
          ],
          [
            "G3",
            1.0
          ],
          [
            null,
            1.0
          ]
        ],
        [
          [
            "C3",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            null,
            1.0
          ],
          [
            "G3",
            1.0
          ],
          [
            null,
            1.0
          ]
        ],
        [
          [
            "C3",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            null,
            1.0
          ],
          [
            "A3",
            1.0
          ],
          [
            null,
            1.0
          ]
        ],
        [
          [
            "C3",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            null,
            1.0
          ],
          [
            "A3",
            1.0
          ],
          [
            null,
            1.0
          ]
        ],
        [
          [
            "D3",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            null,
            1.0
          ],
          [
            "A3",
            1.0
          ],
          [
            null,
            1.0
          ]
        ],
        [
          [
            "B2",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            null,
            1.0
          ],
          [
            "G3",
            1.0
          ],
          [
            null,
            1.0
          ]
        ],
        [
          [
            "C3",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            null,
            1.0
          ],
          [
            "G3",
            1.0
          ],
          [
            null,
            1.0
          ]
        ],
        [
          [
            "C3",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            null,
            1.0
          ],
          [
            "A3",
            1.0
          ],
          [
            null,
            1.0
          ]
        ],
        [
          [
            "B2",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            null,
            1.0
          ],
          [
            "G3",
            1.0
          ],
          [
            null,
            1.0
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            4.0,
            {
              "fermata": true,
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ]
      ],
      "harmony": [
        "C",
        "F/C",
        "G/B",
        "G/B",
        "C",
        "Dm",
        "G/B",
        "C",
        "Am/C",
        "F/C",
        "Dm",
        "G/B",
        "C",
        "F/C",
        "G/B",
        "C"
      ],
      "phraseMarkers": [
        "A",
        null,
        null,
        null,
        "A1",
        null,
        null,
        null,
        "B",
        null,
        null,
        null,
        "A2",
        null,
        null,
        null
      ],
      "dynamicChanges": [
        [
          {
            "hand": "rh",
            "value": "mp"
          },
          {
            "hand": "lh",
            "value": "p"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "value": "mf"
          }
        ],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "value": "mp"
          }
        ],
        [],
        [
          {
            "hand": "rh",
            "value": "p"
          }
        ],
        []
      ],
      "expressionWords": [
        [
          {
            "hand": "rh",
            "text": "Dolce / BPM 56"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "text": "dim."
          }
        ],
        []
      ],
      "studyLabels": [
        "A · C · P mp · T p",
        "F/C",
        "G/B",
        "G/B",
        "A1 · C",
        "Dm",
        "G/B",
        "C",
        "B · Am/C · P mf",
        "F/C",
        "Dm",
        "G/B",
        "A2 · C · P mp",
        "F/C",
        "G/B · P p · dim.",
        "C"
      ],
      "performance": {
        "rh": {
          "gainByBar": [
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            1.05,
            1.05,
            1.05,
            1.05,
            0.85,
            0.85,
            0.6,
            0.6
          ],
          "gate": 0.98
        },
        "lh": {
          "gainByBar": [
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6
          ],
          "gate": 0.98
        }
      },
      "goal": "Bass và hợp âm đáp, nốt trên tạo giai điệu",
      "focus": "Giai điệu là nốt trên của mỗi hợp âm phải. Trái đi trước, phải đáp ở 2 và 4.",
      "pass_rule": "Chơi đủ 16 ô ở tốc độ bạn giữ được (từ 40 BPM), đúng nốt và nhịp, tiếng hát rõ hơn nền; tự kiểm tra trên đàn.",
      "variation": "Ngân nga khi tay kia đệm. Thử A nhỏ, B rõ hơn rồi trở lại A cùng tốc độ; hôm sau kiểm tra trước khi ôn.",
      "fingers": "Chỉ hiện số ngón nguồn ở điểm vào/đổi thế; chỗ không ghi số cần giữ thế tay phù hợp.",
      "touch": "Dolce: dịu và có hướng câu; p/mp/mf theo sheet. Đếm đủ nốt cuối trước khi ngân; pedal chỉ thêm khi nốt và nhịp đã ổn.",
      "mission": {
        "title": "Bước chân trên cỏ",
        "hand": "lh",
        "range": [
          1,
          4
        ],
        "duoRange": [
          7,
          9
        ],
        "solo": "Nghe và ngân nga câu A; đọc rồi tập tay trái riêng ô 1–4.",
        "duo": "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
        "finalTempo": 40,
        "finalBpm": 56,
        "labels": [
          "Nghe & học câu A",
          "Nối A1 vào B",
          "Chơi đủ 16 ô"
        ]
      },
      "phrases": [
        {
          "label": "A",
          "from": 1,
          "to": 4
        },
        {
          "label": "A1",
          "from": 5,
          "to": 8
        },
        {
          "label": "B",
          "from": 9,
          "to": 12
        },
        {
          "label": "A2",
          "from": 13,
          "to": 16
        },
        {
          "label": "Cả bài",
          "from": 1,
          "to": 16
        }
      ],
      "book": {
        "id": "pieces-18",
        "label": "18 tiểu phẩm · Những ngày êm đềm",
        "chapter": 5,
        "sourceNumber": 13,
        "pages": [
          33,
          32
        ],
        "kind": "transcribed",
        "reference": "Tiểu phẩm 13 · đủ 16 ô · trang sheet và trang học",
        "musicxml": "assets/books/pieces18-sources/13_piece.musicxml",
        "midi": {
          "both": "assets/books/pieces18-sources/13_both_hands.mid",
          "right": "assets/books/pieces18-sources/13_right_hand.mid",
          "left": "assets/books/pieces18-sources/13_left_hand.mid"
        },
        "repair": "Sửa đúng một lỗi; luyện ô lỗi cùng ô trước/sau, rồi nối lại câu. Nếu chưa ổn, giảm 4–8 BPM.",
        "repairLessons": [
          133,
          147,
          151
        ],
        "steps": [
          "Nghe và ngân nga câu A; đọc rồi tập tay trái riêng ô 1–4.",
          "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
          "Chơi đủ 16 ô không dừng: giai điệu rõ, nền nhẹ, đúng nốt/trường độ và tay thoải mái. Giữ đủ nốt cuối rồi mới ngân thêm."
        ],
        "review": "Hôm sau chơi một lượt trước khi ôn. Tự ghi một lỗi nốt/nhịp và một mục tiêu âm thanh; chưa có kiểm tra tự động sau nghỉ."
      }
    },
    {
      "id": 168,
      "stage": 37,
      "title": "Valse của chiếc lá",
      "bpm": 60,
      "meter": 3,
      "keySignature": "F",
      "rh": [
        [
          [
            "A4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "G4",
            1.0
          ],
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "Bb4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 4
            }
          ],
          [
            "A4",
            1.0
          ],
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "G4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "A4",
            1.0
          ],
          [
            "Bb4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "G4",
            3.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "A4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "C5",
            1.0
          ],
          [
            "A4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "Bb4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "A4",
            1.0
          ],
          [
            "G4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "G4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "Bb4",
            1.0
          ],
          [
            "G4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            3.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "D5",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 4
            }
          ],
          [
            "C5",
            1.0
          ],
          [
            "A4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "Bb4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 4
            }
          ],
          [
            "A4",
            1.0
          ],
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "Bb4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "A4",
            1.0
          ],
          [
            "G4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "G4",
            3.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "A4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "G4",
            1.0
          ],
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "Bb4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 4
            }
          ],
          [
            "A4",
            1.0
          ],
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "G4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "A4",
            1.0
          ],
          [
            "Bb4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            3.0,
            {
              "fermata": true,
              "finger": 1
            }
          ]
        ]
      ],
      "lh": [
        [
          [
            "F2",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            [
              "F2",
              "A2",
              "C3"
            ],
            1.0
          ],
          [
            [
              "F2",
              "A2",
              "C3"
            ],
            1.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            "F2",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            [
              "F2",
              "Bb2",
              "D3"
            ],
            1.0
          ],
          [
            [
              "F2",
              "Bb2",
              "D3"
            ],
            1.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            "E2",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            [
              "E2",
              "G2",
              "C3"
            ],
            1.0
          ],
          [
            [
              "E2",
              "G2",
              "C3"
            ],
            1.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            "E2",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            [
              "E2",
              "G2",
              "C3"
            ],
            1.0
          ],
          [
            [
              "E2",
              "G2",
              "C3"
            ],
            1.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            "F2",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            [
              "F2",
              "A2",
              "C3"
            ],
            1.0
          ],
          [
            [
              "F2",
              "A2",
              "C3"
            ],
            1.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            "G2",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            [
              "G2",
              "Bb2",
              "D3"
            ],
            1.0
          ],
          [
            [
              "G2",
              "Bb2",
              "D3"
            ],
            1.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            "E2",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            [
              "E2",
              "G2",
              "C3"
            ],
            1.0
          ],
          [
            [
              "E2",
              "G2",
              "C3"
            ],
            1.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            "F2",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            [
              "F2",
              "A2",
              "C3"
            ],
            1.0
          ],
          [
            [
              "F2",
              "A2",
              "C3"
            ],
            1.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            "F2",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            [
              "F2",
              "A2",
              "D3"
            ],
            1.0
          ],
          [
            [
              "F2",
              "A2",
              "D3"
            ],
            1.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            "F2",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            [
              "F2",
              "Bb2",
              "D3"
            ],
            1.0
          ],
          [
            [
              "F2",
              "Bb2",
              "D3"
            ],
            1.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            "G2",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            [
              "G2",
              "Bb2",
              "D3"
            ],
            1.0
          ],
          [
            [
              "G2",
              "Bb2",
              "D3"
            ],
            1.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            "E2",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            [
              "E2",
              "G2",
              "C3"
            ],
            1.0
          ],
          [
            [
              "E2",
              "G2",
              "C3"
            ],
            1.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            "F2",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            [
              "F2",
              "A2",
              "C3"
            ],
            1.0
          ],
          [
            [
              "F2",
              "A2",
              "C3"
            ],
            1.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            "F2",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            [
              "F2",
              "Bb2",
              "D3"
            ],
            1.0
          ],
          [
            [
              "F2",
              "Bb2",
              "D3"
            ],
            1.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            "E2",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            [
              "E2",
              "G2",
              "C3"
            ],
            1.0
          ],
          [
            [
              "E2",
              "G2",
              "C3"
            ],
            1.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "F2",
              "A2",
              "C3"
            ],
            3.0,
            {
              "fermata": true,
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ]
      ],
      "harmony": [
        "F",
        "Bb/F",
        "C/E",
        "C/E",
        "F",
        "Gm",
        "C/E",
        "F",
        "Dm/F",
        "Bb/F",
        "Gm",
        "C/E",
        "F",
        "Bb/F",
        "C/E",
        "F"
      ],
      "phraseMarkers": [
        "A",
        null,
        null,
        null,
        "A1",
        null,
        null,
        null,
        "B",
        null,
        null,
        null,
        "A2",
        null,
        null,
        null
      ],
      "dynamicChanges": [
        [
          {
            "hand": "rh",
            "value": "mp"
          },
          {
            "hand": "lh",
            "value": "p"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "value": "mf"
          }
        ],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "value": "mp"
          }
        ],
        [],
        [
          {
            "hand": "rh",
            "value": "p"
          }
        ],
        []
      ],
      "expressionWords": [
        [
          {
            "hand": "rh",
            "text": "Dolce / BPM 60"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "text": "dim."
          }
        ],
        []
      ],
      "studyLabels": [
        "A · F · P mp · T p",
        "Bb/F",
        "C/E",
        "C/E",
        "A1 · F",
        "Gm",
        "C/E",
        "F",
        "B · Dm/F · P mf",
        "Bb/F",
        "Gm",
        "C/E",
        "A2 · F · P mp",
        "Bb/F",
        "C/E · P p · dim.",
        "F"
      ],
      "performance": {
        "rh": {
          "gainByBar": [
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            1.05,
            1.05,
            1.05,
            1.05,
            0.85,
            0.85,
            0.6,
            0.6
          ],
          "gate": 0.98
        },
        "lh": {
          "gainByBar": [
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6
          ],
          "gate": 0.98
        }
      },
      "goal": "Đệm 3/4 nhẹ và giai điệu có hướng",
      "focus": "Đếm 1-2-3; trái bass ở 1, hợp âm ở 2 và 3. Phách 1 rõ vừa đủ.",
      "pass_rule": "Chơi đủ 16 ô ở tốc độ bạn giữ được (từ 40 BPM), đúng nốt và nhịp, tiếng hát rõ hơn nền; tự kiểm tra trên đàn.",
      "variation": "Ngân nga khi tay kia đệm. Thử A nhỏ, B rõ hơn rồi trở lại A cùng tốc độ; hôm sau kiểm tra trước khi ôn.",
      "fingers": "Chỉ hiện số ngón nguồn ở điểm vào/đổi thế; chỗ không ghi số cần giữ thế tay phù hợp.",
      "touch": "Dolce: dịu và có hướng câu; p/mp/mf theo sheet. Đếm đủ nốt cuối trước khi ngân; pedal chỉ thêm khi nốt và nhịp đã ổn.",
      "mission": {
        "title": "Valse của chiếc lá",
        "hand": "lh",
        "range": [
          1,
          4
        ],
        "duoRange": [
          7,
          9
        ],
        "solo": "Nghe và ngân nga câu A; đọc rồi tập tay trái riêng ô 1–4.",
        "duo": "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
        "finalTempo": 40,
        "finalBpm": 60,
        "labels": [
          "Nghe & học câu A",
          "Nối A1 vào B",
          "Chơi đủ 16 ô"
        ]
      },
      "phrases": [
        {
          "label": "A",
          "from": 1,
          "to": 4
        },
        {
          "label": "A1",
          "from": 5,
          "to": 8
        },
        {
          "label": "B",
          "from": 9,
          "to": 12
        },
        {
          "label": "A2",
          "from": 13,
          "to": 16
        },
        {
          "label": "Cả bài",
          "from": 1,
          "to": 16
        }
      ],
      "book": {
        "id": "pieces-18",
        "label": "18 tiểu phẩm · Những ngày êm đềm",
        "chapter": 5,
        "sourceNumber": 14,
        "pages": [
          35,
          34
        ],
        "kind": "transcribed",
        "reference": "Tiểu phẩm 14 · đủ 16 ô · trang sheet và trang học",
        "musicxml": "assets/books/pieces18-sources/14_piece.musicxml",
        "midi": {
          "both": "assets/books/pieces18-sources/14_both_hands.mid",
          "right": "assets/books/pieces18-sources/14_right_hand.mid",
          "left": "assets/books/pieces18-sources/14_left_hand.mid"
        },
        "repair": "Sửa đúng một lỗi; luyện ô lỗi cùng ô trước/sau, rồi nối lại câu. Nếu chưa ổn, giảm 4–8 BPM.",
        "repairLessons": [
          147,
          148,
          151
        ],
        "steps": [
          "Nghe và ngân nga câu A; đọc rồi tập tay trái riêng ô 1–4.",
          "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
          "Chơi đủ 16 ô không dừng: giai điệu rõ, nền nhẹ, đúng nốt/trường độ và tay thoải mái. Giữ đủ nốt cuối rồi mới ngân thêm."
        ],
        "review": "Hôm sau chơi một lượt trước khi ôn. Tự ghi một lỗi nốt/nhịp và một mục tiêu âm thanh; chưa có kiểm tra tự động sau nghỉ."
      }
    },
    {
      "id": 169,
      "stage": 37,
      "title": "Mặt hồ buổi sớm",
      "bpm": 48,
      "meter": 4,
      "keySignature": "C",
      "rh": [
        [
          [
            "E4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "G4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 2
            }
          ],
          [
            "E4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "F4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "E4",
            1.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "D4",
            0.5
          ],
          [
            "C4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            1.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "E4",
            0.5
          ],
          [
            "D4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "B3",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "A4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 4
            }
          ],
          [
            "G4",
            1.0
          ],
          [
            "E4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 4
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "C4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "D4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "E4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "G4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 2
            }
          ],
          [
            "E4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "F4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C4",
            4.0,
            {
              "fermata": true,
              "finger": 1
            }
          ]
        ]
      ],
      "lh": [
        [
          [
            "C3",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "G3",
            0.5
          ],
          [
            "E3",
            0.5
          ],
          [
            "G3",
            0.5
          ],
          [
            "C3",
            0.5
          ],
          [
            "G3",
            0.5
          ],
          [
            "E3",
            0.5
          ],
          [
            "G3",
            0.5
          ]
        ],
        [
          [
            "C3",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "A3",
            0.5
          ],
          [
            "F3",
            0.5
          ],
          [
            "A3",
            0.5
          ],
          [
            "C3",
            0.5
          ],
          [
            "A3",
            0.5
          ],
          [
            "F3",
            0.5
          ],
          [
            "A3",
            0.5
          ]
        ],
        [
          [
            "B2",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "G3",
            0.5
          ],
          [
            "D3",
            0.5
          ],
          [
            "G3",
            0.5
          ],
          [
            "B2",
            0.5
          ],
          [
            "G3",
            0.5
          ],
          [
            "D3",
            0.5
          ],
          [
            "G3",
            0.5
          ]
        ],
        [
          [
            "B2",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "G3",
            0.5
          ],
          [
            "D3",
            0.5
          ],
          [
            "G3",
            0.5
          ],
          [
            "B2",
            0.5
          ],
          [
            "G3",
            0.5
          ],
          [
            "D3",
            0.5
          ],
          [
            "G3",
            0.5
          ]
        ],
        [
          [
            "C3",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "G3",
            0.5
          ],
          [
            "E3",
            0.5
          ],
          [
            "G3",
            0.5
          ],
          [
            "C3",
            0.5
          ],
          [
            "G3",
            0.5
          ],
          [
            "E3",
            0.5
          ],
          [
            "G3",
            0.5
          ]
        ],
        [
          [
            "D3",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "A3",
            0.5
          ],
          [
            "F3",
            0.5
          ],
          [
            "A3",
            0.5
          ],
          [
            "D3",
            0.5
          ],
          [
            "A3",
            0.5
          ],
          [
            "F3",
            0.5
          ],
          [
            "A3",
            0.5
          ]
        ],
        [
          [
            "B2",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "G3",
            0.5
          ],
          [
            "D3",
            0.5
          ],
          [
            "G3",
            0.5
          ],
          [
            "B2",
            0.5
          ],
          [
            "G3",
            0.5
          ],
          [
            "D3",
            0.5
          ],
          [
            "G3",
            0.5
          ]
        ],
        [
          [
            "C3",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "G3",
            0.5
          ],
          [
            "E3",
            0.5
          ],
          [
            "G3",
            0.5
          ],
          [
            "C3",
            0.5
          ],
          [
            "G3",
            0.5
          ],
          [
            "E3",
            0.5
          ],
          [
            "G3",
            0.5
          ]
        ],
        [
          [
            "C3",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "A3",
            0.5
          ],
          [
            "E3",
            0.5
          ],
          [
            "A3",
            0.5
          ],
          [
            "C3",
            0.5
          ],
          [
            "A3",
            0.5
          ],
          [
            "E3",
            0.5
          ],
          [
            "A3",
            0.5
          ]
        ],
        [
          [
            "C3",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "A3",
            0.5
          ],
          [
            "F3",
            0.5
          ],
          [
            "A3",
            0.5
          ],
          [
            "C3",
            0.5
          ],
          [
            "A3",
            0.5
          ],
          [
            "F3",
            0.5
          ],
          [
            "A3",
            0.5
          ]
        ],
        [
          [
            "D3",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "A3",
            0.5
          ],
          [
            "F3",
            0.5
          ],
          [
            "A3",
            0.5
          ],
          [
            "D3",
            0.5
          ],
          [
            "A3",
            0.5
          ],
          [
            "F3",
            0.5
          ],
          [
            "A3",
            0.5
          ]
        ],
        [
          [
            "B2",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "G3",
            0.5
          ],
          [
            "D3",
            0.5
          ],
          [
            "G3",
            0.5
          ],
          [
            "B2",
            0.5
          ],
          [
            "G3",
            0.5
          ],
          [
            "D3",
            0.5
          ],
          [
            "G3",
            0.5
          ]
        ],
        [
          [
            "C3",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "G3",
            0.5
          ],
          [
            "E3",
            0.5
          ],
          [
            "G3",
            0.5
          ],
          [
            "C3",
            0.5
          ],
          [
            "G3",
            0.5
          ],
          [
            "E3",
            0.5
          ],
          [
            "G3",
            0.5
          ]
        ],
        [
          [
            "C3",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "A3",
            0.5
          ],
          [
            "F3",
            0.5
          ],
          [
            "A3",
            0.5
          ],
          [
            "C3",
            0.5
          ],
          [
            "A3",
            0.5
          ],
          [
            "F3",
            0.5
          ],
          [
            "A3",
            0.5
          ]
        ],
        [
          [
            "B2",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "G3",
            0.5
          ],
          [
            "D3",
            0.5
          ],
          [
            "G3",
            0.5
          ],
          [
            "B2",
            0.5
          ],
          [
            "G3",
            0.5
          ],
          [
            "D3",
            0.5
          ],
          [
            "G3",
            0.5
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            4.0,
            {
              "fermata": true,
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ]
      ],
      "harmony": [
        "C",
        "F/C",
        "G/B",
        "G/B",
        "C",
        "Dm",
        "G/B",
        "C",
        "Am/C",
        "F/C",
        "Dm",
        "G/B",
        "C",
        "F/C",
        "G/B",
        "C"
      ],
      "phraseMarkers": [
        "A",
        null,
        null,
        null,
        "A1",
        null,
        null,
        null,
        "B",
        null,
        null,
        null,
        "A2",
        null,
        null,
        null
      ],
      "dynamicChanges": [
        [
          {
            "hand": "rh",
            "value": "mp"
          },
          {
            "hand": "lh",
            "value": "p"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "value": "mf"
          }
        ],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "value": "mp"
          }
        ],
        [],
        [
          {
            "hand": "rh",
            "value": "p"
          }
        ],
        []
      ],
      "expressionWords": [
        [
          {
            "hand": "rh",
            "text": "Dolce / BPM 48"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "text": "dim."
          }
        ],
        []
      ],
      "studyLabels": [
        "A · C · P mp · T p",
        "F/C",
        "G/B",
        "G/B",
        "A1 · C",
        "Dm",
        "G/B",
        "C",
        "B · Am/C · P mf",
        "F/C",
        "Dm",
        "G/B",
        "A2 · C · P mp",
        "F/C",
        "G/B · P p · dim.",
        "C"
      ],
      "performance": {
        "rh": {
          "gainByBar": [
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            1.05,
            1.05,
            1.05,
            1.05,
            0.85,
            0.85,
            0.6,
            0.6
          ],
          "gate": 0.98
        },
        "lh": {
          "gainByBar": [
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6
          ],
          "gate": 0.98
        }
      },
      "goal": "Mẫu Alberti bên dưới giai điệu dài",
      "focus": "Trái thấp-cao-giữa-cao: 5-1-3-1. Giữ tiếng đệm nhỏ và đều.",
      "pass_rule": "Chơi đủ 16 ô ở tốc độ bạn giữ được (từ 40 BPM), đúng nốt và nhịp, tiếng hát rõ hơn nền; tự kiểm tra trên đàn.",
      "variation": "Ngân nga khi tay kia đệm. Thử A nhỏ, B rõ hơn rồi trở lại A cùng tốc độ; hôm sau kiểm tra trước khi ôn.",
      "fingers": "Chỉ hiện số ngón nguồn ở điểm vào/đổi thế; chỗ không ghi số cần giữ thế tay phù hợp.",
      "touch": "Dolce: dịu và có hướng câu; p/mp/mf theo sheet. Đếm đủ nốt cuối trước khi ngân; pedal chỉ thêm khi nốt và nhịp đã ổn.",
      "mission": {
        "title": "Mặt hồ buổi sớm",
        "hand": "lh",
        "range": [
          1,
          4
        ],
        "duoRange": [
          7,
          9
        ],
        "solo": "Nghe và ngân nga câu A; đọc rồi tập tay trái riêng ô 1–4.",
        "duo": "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
        "finalTempo": 40,
        "finalBpm": 48,
        "labels": [
          "Nghe & học câu A",
          "Nối A1 vào B",
          "Chơi đủ 16 ô"
        ]
      },
      "phrases": [
        {
          "label": "A",
          "from": 1,
          "to": 4
        },
        {
          "label": "A1",
          "from": 5,
          "to": 8
        },
        {
          "label": "B",
          "from": 9,
          "to": 12
        },
        {
          "label": "A2",
          "from": 13,
          "to": 16
        },
        {
          "label": "Cả bài",
          "from": 1,
          "to": 16
        }
      ],
      "book": {
        "id": "pieces-18",
        "label": "18 tiểu phẩm · Những ngày êm đềm",
        "chapter": 5,
        "sourceNumber": 15,
        "pages": [
          37,
          36
        ],
        "kind": "transcribed",
        "reference": "Tiểu phẩm 15 · đủ 16 ô · trang sheet và trang học",
        "musicxml": "assets/books/pieces18-sources/15_piece.musicxml",
        "midi": {
          "both": "assets/books/pieces18-sources/15_both_hands.mid",
          "right": "assets/books/pieces18-sources/15_right_hand.mid",
          "left": "assets/books/pieces18-sources/15_left_hand.mid"
        },
        "repair": "Sửa đúng một lỗi; luyện ô lỗi cùng ô trước/sau, rồi nối lại câu. Nếu chưa ổn, giảm 4–8 BPM.",
        "repairLessons": [
          140,
          149,
          151
        ],
        "steps": [
          "Nghe và ngân nga câu A; đọc rồi tập tay trái riêng ô 1–4.",
          "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
          "Chơi đủ 16 ô không dừng: giai điệu rõ, nền nhẹ, đúng nốt/trường độ và tay thoải mái. Giữ đủ nốt cuối rồi mới ngân thêm."
        ],
        "review": "Hôm sau chơi một lượt trước khi ôn. Tự ghi một lỗi nốt/nhịp và một mục tiêu âm thanh; chưa có kiểm tra tự động sau nghỉ."
      }
    },
    {
      "id": 170,
      "stage": 38,
      "title": "Ngọn đèn ngoài hiên",
      "bpm": 44,
      "meter": 4,
      "keySignature": "C",
      "rh": [
        [
          [
            null,
            0.5
          ],
          [
            [
              "E4",
              "G4"
            ],
            0.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ],
          [
            null,
            0.5
          ],
          [
            [
              "C4",
              "E4"
            ],
            0.5
          ],
          [
            null,
            0.5
          ],
          [
            [
              "E4",
              "G4"
            ],
            0.5
          ],
          [
            null,
            0.5
          ],
          [
            [
              "C4",
              "E4"
            ],
            0.5,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ]
        ],
        [
          [
            null,
            0.5
          ],
          [
            [
              "F4",
              "A4"
            ],
            0.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ],
          [
            null,
            0.5
          ],
          [
            [
              "C4",
              "F4"
            ],
            0.5
          ],
          [
            null,
            0.5
          ],
          [
            [
              "F4",
              "A4"
            ],
            0.5
          ],
          [
            null,
            0.5
          ],
          [
            [
              "C4",
              "F4"
            ],
            0.5,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                5
              ]
            }
          ]
        ],
        [
          [
            null,
            0.5
          ],
          [
            [
              "D4",
              "G4"
            ],
            0.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                5
              ]
            }
          ],
          [
            null,
            0.5
          ],
          [
            [
              "D4",
              "F4"
            ],
            0.5
          ],
          [
            null,
            0.5
          ],
          [
            [
              "B3",
              "D4"
            ],
            0.5
          ],
          [
            null,
            0.5
          ],
          [
            [
              "D4",
              "F4"
            ],
            0.5,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ]
        ],
        [
          [
            [
              "B3",
              "D4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3
              ]
            }
          ]
        ],
        [
          [
            null,
            0.5
          ],
          [
            [
              "C4",
              "E4"
            ],
            0.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ],
          [
            null,
            0.5
          ],
          [
            [
              "E4",
              "G4"
            ],
            0.5
          ],
          [
            null,
            0.5
          ],
          [
            [
              "C4",
              "E4"
            ],
            0.5
          ],
          [
            null,
            0.5
          ],
          [
            [
              "E4",
              "G4"
            ],
            0.5,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ]
        ],
        [
          [
            null,
            0.5
          ],
          [
            [
              "D4",
              "F4"
            ],
            0.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ],
          [
            null,
            0.5
          ],
          [
            [
              "F4",
              "A4"
            ],
            0.5
          ],
          [
            null,
            0.5
          ],
          [
            [
              "D4",
              "F4"
            ],
            0.5
          ],
          [
            null,
            0.5
          ],
          [
            [
              "B3",
              "D4"
            ],
            0.5,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ]
        ],
        [
          [
            null,
            0.5
          ],
          [
            [
              "D4",
              "F4"
            ],
            0.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ],
          [
            null,
            0.5
          ],
          [
            [
              "B3",
              "D4"
            ],
            0.5
          ],
          [
            null,
            0.5
          ],
          [
            [
              "D4",
              "F4"
            ],
            0.5
          ],
          [
            null,
            0.5
          ],
          [
            [
              "B3",
              "D4"
            ],
            0.5,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ]
        ],
        [
          [
            [
              "A3",
              "C4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3
              ]
            }
          ]
        ],
        [
          [
            null,
            0.5
          ],
          [
            [
              "E4",
              "A4"
            ],
            0.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                5
              ]
            }
          ],
          [
            null,
            0.5
          ],
          [
            [
              "E4",
              "G4"
            ],
            0.5
          ],
          [
            null,
            0.5
          ],
          [
            [
              "C4",
              "E4"
            ],
            0.5
          ],
          [
            null,
            0.5
          ],
          [
            [
              "E4",
              "A4"
            ],
            0.5,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                5
              ]
            }
          ]
        ],
        [
          [
            null,
            0.5
          ],
          [
            [
              "F4",
              "A4"
            ],
            0.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ],
          [
            null,
            0.5
          ],
          [
            [
              "C4",
              "F4"
            ],
            0.5
          ],
          [
            null,
            0.5
          ],
          [
            [
              "C4",
              "E4"
            ],
            0.5
          ],
          [
            null,
            0.5
          ],
          [
            [
              "C4",
              "F4"
            ],
            0.5,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                5
              ]
            }
          ]
        ],
        [
          [
            null,
            0.5
          ],
          [
            [
              "D4",
              "F4"
            ],
            0.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ],
          [
            null,
            0.5
          ],
          [
            [
              "D4",
              "E4"
            ],
            0.5
          ],
          [
            null,
            0.5
          ],
          [
            [
              "B3",
              "D4"
            ],
            0.5
          ],
          [
            null,
            0.5
          ],
          [
            [
              "D4",
              "F4"
            ],
            0.5,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ]
        ],
        [
          [
            [
              "B3",
              "D4"
            ],
            4.0,
            {
              "fingers": [
                1,
                3
              ]
            }
          ]
        ],
        [
          [
            null,
            0.5
          ],
          [
            [
              "E4",
              "G4"
            ],
            0.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ],
          [
            null,
            0.5
          ],
          [
            [
              "C4",
              "E4"
            ],
            0.5
          ],
          [
            null,
            0.5
          ],
          [
            [
              "E4",
              "G4"
            ],
            0.5
          ],
          [
            null,
            0.5
          ],
          [
            [
              "C4",
              "E4"
            ],
            0.5,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ]
        ],
        [
          [
            null,
            0.5
          ],
          [
            [
              "F4",
              "A4"
            ],
            0.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ],
          [
            null,
            0.5
          ],
          [
            [
              "C4",
              "F4"
            ],
            0.5
          ],
          [
            null,
            0.5
          ],
          [
            [
              "F4",
              "A4"
            ],
            0.5
          ],
          [
            null,
            0.5
          ],
          [
            [
              "C4",
              "F4"
            ],
            0.5,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                5
              ]
            }
          ]
        ],
        [
          [
            null,
            0.5
          ],
          [
            [
              "D4",
              "G4"
            ],
            0.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                5
              ]
            }
          ],
          [
            null,
            0.5
          ],
          [
            [
              "D4",
              "F4"
            ],
            0.5
          ],
          [
            null,
            0.5
          ],
          [
            [
              "B3",
              "D4"
            ],
            0.5
          ],
          [
            null,
            0.5
          ],
          [
            [
              "D4",
              "F4"
            ],
            0.5,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ],
              "fingers": [
                1,
                3
              ]
            }
          ]
        ],
        [
          [
            "C4",
            4.0,
            {
              "fermata": true,
              "finger": 1
            }
          ]
        ]
      ],
      "lh": [
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "F3",
              "A3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "D3",
              "F3",
              "A3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "A3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "F3",
              "A3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "D3",
              "F3",
              "A3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "F3",
              "A3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            4.0,
            {
              "fermata": true,
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ]
      ],
      "harmony": [
        "C",
        "F/C",
        "G/B",
        "G/B",
        "C",
        "Dm",
        "G/B",
        "C",
        "Am/C",
        "F/C",
        "Dm",
        "G/B",
        "C",
        "F/C",
        "G/B",
        "C"
      ],
      "phraseMarkers": [
        "A",
        null,
        null,
        null,
        "A1",
        null,
        null,
        null,
        "B",
        null,
        null,
        null,
        "A2",
        null,
        null,
        null
      ],
      "dynamicChanges": [
        [
          {
            "hand": "rh",
            "value": "mp"
          },
          {
            "hand": "lh",
            "value": "p"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "value": "mf"
          }
        ],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "value": "mp"
          }
        ],
        [],
        [
          {
            "hand": "rh",
            "value": "p"
          }
        ],
        []
      ],
      "expressionWords": [
        [
          {
            "hand": "rh",
            "text": "Dolce / BPM 44"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "text": "dim."
          }
        ],
        []
      ],
      "studyLabels": [
        "A · C · P mp · T p",
        "F/C",
        "G/B",
        "G/B",
        "A1 · C",
        "Dm",
        "G/B",
        "C",
        "B · Am/C · P mf",
        "F/C",
        "Dm",
        "G/B",
        "A2 · C · P mp",
        "F/C",
        "G/B · P p · dim.",
        "C"
      ],
      "performance": {
        "rh": {
          "gainByBar": [
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            1.05,
            1.05,
            1.05,
            1.05,
            0.85,
            0.85,
            0.6,
            0.6
          ],
          "gate": 0.98
        },
        "lh": {
          "gainByBar": [
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6
          ],
          "gate": 0.98
        }
      },
      "goal": "Hợp âm phải lệch phách và giữ nhịp bên trong",
      "focus": "Tay phải vào ở chữ và. Chơi nhẹ, tránh biến lệch phách thành nhịp nhanh.",
      "pass_rule": "Chơi đủ 16 ô ở tốc độ bạn giữ được (từ 40 BPM), đúng nốt và nhịp, tiếng hát rõ hơn nền; tự kiểm tra trên đàn.",
      "variation": "Ngân nga khi tay kia đệm. Thử A nhỏ, B rõ hơn rồi trở lại A cùng tốc độ; hôm sau kiểm tra trước khi ôn.",
      "fingers": "Chỉ hiện số ngón nguồn ở điểm vào/đổi thế; chỗ không ghi số cần giữ thế tay phù hợp.",
      "touch": "Dolce: dịu và có hướng câu; p/mp/mf theo sheet. Đếm đủ nốt cuối trước khi ngân; pedal chỉ thêm khi nốt và nhịp đã ổn.",
      "mission": {
        "title": "Ngọn đèn ngoài hiên",
        "hand": "lh",
        "range": [
          1,
          4
        ],
        "duoRange": [
          7,
          9
        ],
        "solo": "Nghe và ngân nga câu A; đọc rồi tập tay trái riêng ô 1–4.",
        "duo": "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
        "finalTempo": 40,
        "finalBpm": 44,
        "labels": [
          "Nghe & học câu A",
          "Nối A1 vào B",
          "Chơi đủ 16 ô"
        ]
      },
      "phrases": [
        {
          "label": "A",
          "from": 1,
          "to": 4
        },
        {
          "label": "A1",
          "from": 5,
          "to": 8
        },
        {
          "label": "B",
          "from": 9,
          "to": 12
        },
        {
          "label": "A2",
          "from": 13,
          "to": 16
        },
        {
          "label": "Cả bài",
          "from": 1,
          "to": 16
        }
      ],
      "book": {
        "id": "pieces-18",
        "label": "18 tiểu phẩm · Những ngày êm đềm",
        "chapter": 6,
        "sourceNumber": 16,
        "pages": [
          39,
          38
        ],
        "kind": "transcribed",
        "reference": "Tiểu phẩm 16 · đủ 16 ô · trang sheet và trang học",
        "musicxml": "assets/books/pieces18-sources/16_piece.musicxml",
        "midi": {
          "both": "assets/books/pieces18-sources/16_both_hands.mid",
          "right": "assets/books/pieces18-sources/16_right_hand.mid",
          "left": "assets/books/pieces18-sources/16_left_hand.mid"
        },
        "repair": "Sửa đúng một lỗi; luyện ô lỗi cùng ô trước/sau, rồi nối lại câu. Nếu chưa ổn, giảm 4–8 BPM.",
        "repairLessons": [
          133,
          150,
          151
        ],
        "steps": [
          "Nghe và ngân nga câu A; đọc rồi tập tay trái riêng ô 1–4.",
          "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
          "Chơi đủ 16 ô không dừng: giai điệu rõ, nền nhẹ, đúng nốt/trường độ và tay thoải mái. Giữ đủ nốt cuối rồi mới ngân thêm."
        ],
        "review": "Hôm sau chơi một lượt trước khi ôn. Tự ghi một lỗi nốt/nhịp và một mục tiêu âm thanh; chưa có kiểm tra tự động sau nghỉ."
      }
    },
    {
      "id": 171,
      "stage": 38,
      "title": "Khúc hát trở về",
      "bpm": 56,
      "meter": 4,
      "keySignature": "C",
      "rh": [
        [
          [
            "E4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "D4",
            1.0
          ],
          [
            "C4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 4
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "C4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "D4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "E4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "G4",
            1.0
          ],
          [
            "E4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "D4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 5
            }
          ],
          [
            "B3",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "A4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 4
            }
          ],
          [
            "G4",
            1.0
          ],
          [
            "E4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 4
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "C4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "D4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "E4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "D4",
            1.0
          ],
          [
            "C4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 4
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "C4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            2.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "D4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C4",
            4.0,
            {
              "fermata": true,
              "finger": 1
            }
          ]
        ]
      ],
      "lh": [
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "F3",
              "A3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "F3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                2,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "F3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                2,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "D3",
              "F3",
              "A3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "F3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                2,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "A3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "F3",
              "A3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "D3",
              "F3",
              "A3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "F3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                2,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "F3",
              "A3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "F3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                2,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            4.0,
            {
              "fermata": true,
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ]
      ],
      "harmony": [
        "C",
        "F/C",
        "G7/B",
        "G7/B",
        "C",
        "Dm",
        "G7/B",
        "C",
        "Am/C",
        "F/C",
        "Dm",
        "G7/B",
        "C",
        "F/C",
        "G7/B",
        "C"
      ],
      "phraseMarkers": [
        "A",
        null,
        null,
        null,
        "A1",
        null,
        null,
        null,
        "B",
        null,
        null,
        null,
        "A2",
        null,
        null,
        null
      ],
      "dynamicChanges": [
        [
          {
            "hand": "rh",
            "value": "mp"
          },
          {
            "hand": "lh",
            "value": "p"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "value": "mf"
          }
        ],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "value": "mp"
          }
        ],
        [],
        [
          {
            "hand": "rh",
            "value": "p"
          }
        ],
        []
      ],
      "expressionWords": [
        [
          {
            "hand": "rh",
            "text": "Dolce / BPM 56"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "text": "dim."
          }
        ],
        []
      ],
      "studyLabels": [
        "A · C · P mp · T p",
        "F/C",
        "G7/B",
        "G7/B",
        "A1 · C",
        "Dm",
        "G7/B",
        "C",
        "B · Am/C · P mf",
        "F/C",
        "Dm",
        "G7/B",
        "A2 · C · P mp",
        "F/C",
        "G7/B · P p · dim.",
        "C"
      ],
      "performance": {
        "rh": {
          "gainByBar": [
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            1.05,
            1.05,
            1.05,
            1.05,
            0.85,
            0.85,
            0.6,
            0.6
          ],
          "gate": 0.98
        },
        "lh": {
          "gainByBar": [
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6
          ],
          "gate": 0.98
        }
      },
      "goal": "G7/B giải quyết về C; pedal đổi sau nốt",
      "focus": "Nghe Fa ở G7 đi về Mi, Si đi về Đô. Chơi không pedal trước; pedal là tùy chọn.",
      "pass_rule": "Chơi đủ 16 ô ở tốc độ bạn giữ được (từ 40 BPM), đúng nốt và nhịp, tiếng hát rõ hơn nền; tự kiểm tra trên đàn.",
      "variation": "Ngân nga khi tay kia đệm. Thử A nhỏ, B rõ hơn rồi trở lại A cùng tốc độ; hôm sau kiểm tra trước khi ôn.",
      "fingers": "Chỉ hiện số ngón nguồn ở điểm vào/đổi thế; chỗ không ghi số cần giữ thế tay phù hợp.",
      "touch": "Dolce: dịu và có hướng câu; p/mp/mf theo sheet. Đếm đủ nốt cuối trước khi ngân; pedal chỉ thêm khi nốt và nhịp đã ổn.",
      "mission": {
        "title": "Khúc hát trở về",
        "hand": "rh",
        "range": [
          1,
          4
        ],
        "duoRange": [
          7,
          9
        ],
        "solo": "Nghe và ngân nga câu A; đọc rồi tập tay phải riêng ô 1–4.",
        "duo": "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
        "finalTempo": 40,
        "finalBpm": 56,
        "labels": [
          "Nghe & học câu A",
          "Nối A1 vào B",
          "Chơi đủ 16 ô"
        ]
      },
      "phrases": [
        {
          "label": "A",
          "from": 1,
          "to": 4
        },
        {
          "label": "A1",
          "from": 5,
          "to": 8
        },
        {
          "label": "B",
          "from": 9,
          "to": 12
        },
        {
          "label": "A2",
          "from": 13,
          "to": 16
        },
        {
          "label": "Cả bài",
          "from": 1,
          "to": 16
        }
      ],
      "book": {
        "id": "pieces-18",
        "label": "18 tiểu phẩm · Những ngày êm đềm",
        "chapter": 6,
        "sourceNumber": 17,
        "pages": [
          41,
          40
        ],
        "kind": "transcribed",
        "reference": "Tiểu phẩm 17 · đủ 16 ô · trang sheet và trang học",
        "musicxml": "assets/books/pieces18-sources/17_piece.musicxml",
        "midi": {
          "both": "assets/books/pieces18-sources/17_both_hands.mid",
          "right": "assets/books/pieces18-sources/17_right_hand.mid",
          "left": "assets/books/pieces18-sources/17_left_hand.mid"
        },
        "repair": "Sửa đúng một lỗi; luyện ô lỗi cùng ô trước/sau, rồi nối lại câu. Nếu chưa ổn, giảm 4–8 BPM.",
        "repairLessons": [
          135,
          138,
          153
        ],
        "steps": [
          "Nghe và ngân nga câu A; đọc rồi tập tay phải riêng ô 1–4.",
          "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
          "Chơi đủ 16 ô không dừng: giai điệu rõ, nền nhẹ, đúng nốt/trường độ và tay thoải mái. Giữ đủ nốt cuối rồi mới ngân thêm."
        ],
        "review": "Hôm sau chơi một lượt trước khi ôn. Tự ghi một lỗi nốt/nhịp và một mục tiêu âm thanh; chưa có kiểm tra tự động sau nghỉ."
      }
    },
    {
      "id": 172,
      "stage": 38,
      "title": "Ngày yên bình",
      "bpm": 56,
      "meter": 4,
      "keySignature": "C",
      "rh": [
        [
          [
            "E4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "D4",
            1.0
          ],
          [
            "C4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 4
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "C4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "F4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "E4",
            1.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "G4",
            0.5
          ],
          [
            "E4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            1.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "E4",
            0.5
          ],
          [
            "D4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "F4",
            1.0
          ],
          [
            "E4",
            1.0
          ],
          [
            "D4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "E4",
            0.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "G4",
            0.5
          ],
          [
            "A4",
            1.0
          ],
          [
            "G4",
            0.5
          ],
          [
            "E4",
            0.5
          ],
          [
            "A4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            0.5,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 4
            }
          ],
          [
            "E4",
            0.5
          ],
          [
            "C4",
            1.0
          ],
          [
            "D4",
            0.5
          ],
          [
            "E4",
            0.5
          ],
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "D4",
            1.0
          ],
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            4.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "E4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 3
            }
          ],
          [
            "D4",
            1.0
          ],
          [
            "C4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "F4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 4
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "C4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "D4",
            1.0,
            {
              "slurs": [
                {
                  "type": "start",
                  "number": "1"
                }
              ],
              "finger": 1
            }
          ],
          [
            "E4",
            1.0
          ],
          [
            "F4",
            2.0,
            {
              "slurs": [
                {
                  "type": "stop",
                  "number": "1"
                }
              ]
            }
          ]
        ],
        [
          [
            "C4",
            4.0,
            {
              "fermata": true,
              "finger": 1
            }
          ]
        ]
      ],
      "lh": [
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "F3",
              "A3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            4.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            "C3",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E3",
            1.0
          ],
          [
            "G3",
            1.0
          ],
          [
            "E3",
            1.0
          ]
        ],
        [
          [
            "D3",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "F3",
            1.0
          ],
          [
            "A3",
            1.0
          ],
          [
            "F3",
            1.0
          ]
        ],
        [
          [
            "B2",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "D3",
            1.0
          ],
          [
            "G3",
            1.0
          ],
          [
            "D3",
            1.0
          ]
        ],
        [
          [
            "C3",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E3",
            1.0
          ],
          [
            "G3",
            1.0
          ],
          [
            "E3",
            1.0
          ]
        ],
        [
          [
            "C3",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "A3",
            0.5
          ],
          [
            "E3",
            0.5
          ],
          [
            "A3",
            0.5
          ],
          [
            "C3",
            0.5
          ],
          [
            "A3",
            0.5
          ],
          [
            "E3",
            0.5
          ],
          [
            "A3",
            0.5
          ]
        ],
        [
          [
            "C3",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "A3",
            0.5
          ],
          [
            "F3",
            0.5
          ],
          [
            "A3",
            0.5
          ],
          [
            "C3",
            0.5
          ],
          [
            "A3",
            0.5
          ],
          [
            "F3",
            0.5
          ],
          [
            "A3",
            0.5
          ]
        ],
        [
          [
            "D3",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "A3",
            0.5
          ],
          [
            "F3",
            0.5
          ],
          [
            "A3",
            0.5
          ],
          [
            "D3",
            0.5
          ],
          [
            "A3",
            0.5
          ],
          [
            "F3",
            0.5
          ],
          [
            "A3",
            0.5
          ]
        ],
        [
          [
            "B2",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "G3",
            0.5
          ],
          [
            "D3",
            0.5
          ],
          [
            "G3",
            0.5
          ],
          [
            "B2",
            0.5
          ],
          [
            "G3",
            0.5
          ],
          [
            "D3",
            0.5
          ],
          [
            "G3",
            0.5
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ],
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "F3",
              "A3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ],
          [
            [
              "C3",
              "F3",
              "A3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ],
          [
            [
              "B2",
              "D3",
              "G3"
            ],
            2.0,
            {
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ],
        [
          [
            [
              "C3",
              "E3",
              "G3"
            ],
            4.0,
            {
              "fermata": true,
              "fingers": [
                5,
                3,
                1
              ]
            }
          ]
        ]
      ],
      "harmony": [
        "C",
        "F/C",
        "G/B",
        "G/B",
        "C",
        "Dm",
        "G/B",
        "C",
        "Am/C",
        "F/C",
        "Dm",
        "G/B",
        "C",
        "F/C",
        "G/B",
        "C"
      ],
      "phraseMarkers": [
        "A",
        null,
        null,
        null,
        "A1",
        null,
        null,
        null,
        "B",
        null,
        null,
        null,
        "A2",
        null,
        null,
        null
      ],
      "dynamicChanges": [
        [
          {
            "hand": "rh",
            "value": "mp"
          },
          {
            "hand": "lh",
            "value": "p"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "value": "mf"
          }
        ],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "value": "mp"
          }
        ],
        [],
        [
          {
            "hand": "rh",
            "value": "p"
          }
        ],
        []
      ],
      "expressionWords": [
        [
          {
            "hand": "rh",
            "text": "Dolce / BPM 56"
          }
        ],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [
          {
            "hand": "rh",
            "text": "dim."
          }
        ],
        []
      ],
      "studyLabels": [
        "A · C · P mp · T p",
        "F/C",
        "G/B",
        "G/B",
        "A1 · C",
        "Dm",
        "G/B",
        "C",
        "B · Am/C · P mf",
        "F/C",
        "Dm",
        "G/B",
        "A2 · C · P mp",
        "F/C",
        "G/B · P p · dim.",
        "C"
      ],
      "performance": {
        "rh": {
          "gainByBar": [
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            0.85,
            1.05,
            1.05,
            1.05,
            1.05,
            0.85,
            0.85,
            0.6,
            0.6
          ],
          "gate": 0.98
        },
        "lh": {
          "gainByBar": [
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6,
            0.6
          ],
          "gate": 0.98
        }
      },
      "goal": "Ghép các kiểu đệm thành một tiểu phẩm",
      "focus": "Ô 1-4 giữ; 5-8 rải nốt đen; 9-12 Alberti; 13-16 hai nốt trắng. Ô cuối giữ trọn.",
      "pass_rule": "Chơi đủ 16 ô ở tốc độ bạn giữ được (từ 40 BPM), đúng nốt và nhịp, tiếng hát rõ hơn nền; tự kiểm tra trên đàn.",
      "variation": "Ngân nga khi tay kia đệm. Thử A nhỏ, B rõ hơn rồi trở lại A cùng tốc độ; hôm sau kiểm tra trước khi ôn.",
      "fingers": "Chỉ hiện số ngón nguồn ở điểm vào/đổi thế; chỗ không ghi số cần giữ thế tay phù hợp.",
      "touch": "Dolce: dịu và có hướng câu; p/mp/mf theo sheet. Đếm đủ nốt cuối trước khi ngân; pedal chỉ thêm khi nốt và nhịp đã ổn.",
      "mission": {
        "title": "Ngày yên bình",
        "hand": "rh",
        "range": [
          1,
          4
        ],
        "duoRange": [
          7,
          9
        ],
        "solo": "Nghe và ngân nga câu A; đọc rồi tập tay phải riêng ô 1–4.",
        "duo": "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
        "finalTempo": 40,
        "finalBpm": 56,
        "labels": [
          "Nghe & học câu A",
          "Nối A1 vào B",
          "Chơi đủ 16 ô"
        ]
      },
      "phrases": [
        {
          "label": "A",
          "from": 1,
          "to": 4
        },
        {
          "label": "A1",
          "from": 5,
          "to": 8
        },
        {
          "label": "B",
          "from": 9,
          "to": 12
        },
        {
          "label": "A2",
          "from": 13,
          "to": 16
        },
        {
          "label": "Cả bài",
          "from": 1,
          "to": 16
        }
      ],
      "book": {
        "id": "pieces-18",
        "label": "18 tiểu phẩm · Những ngày êm đềm",
        "chapter": 6,
        "sourceNumber": 18,
        "pages": [
          43,
          42
        ],
        "kind": "transcribed",
        "reference": "Tiểu phẩm 18 · đủ 16 ô · trang sheet và trang học",
        "musicxml": "assets/books/pieces18-sources/18_piece.musicxml",
        "midi": {
          "both": "assets/books/pieces18-sources/18_both_hands.mid",
          "right": "assets/books/pieces18-sources/18_right_hand.mid",
          "left": "assets/books/pieces18-sources/18_left_hand.mid"
        },
        "repair": "Sửa đúng một lỗi; luyện ô lỗi cùng ô trước/sau, rồi nối lại câu. Nếu chưa ổn, giảm 4–8 BPM.",
        "repairLessons": [
          136,
          138,
          140,
          143,
          145,
          146,
          149,
          151,
          154
        ],
        "steps": [
          "Nghe và ngân nga câu A; đọc rồi tập tay phải riêng ô 1–4.",
          "Ghép ô 7–9 để nối A1 vào B. Tập thêm ô 3–5 và 11–13 bằng thanh chọn đoạn; giữ nhịp khi đổi câu.",
          "Chơi đủ 16 ô không dừng: giai điệu rõ, nền nhẹ, đúng nốt/trường độ và tay thoải mái. Giữ đủ nốt cuối rồi mới ngân thêm."
        ],
        "review": "Hôm sau chơi một lượt trước khi ôn. Tự ghi một lỗi nốt/nhịp và một mục tiêu âm thanh; chưa có kiểm tra tự động sau nghỉ."
      }
    }
  ]
};
  data.stages.push(...catalog.stages);data.exercises.push(...catalog.exercises);
  data.bookCurricula.push({"id": "pieces-18", "title": "Những ngày êm đềm · 18 tiểu phẩm", "source": "assets/books/piano-18-tieu-pham.pdf", "lessonIds": [155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172], "firstStage": 33, "stageCount": 6, "mapId": "pieces18-course-map"});
})();
