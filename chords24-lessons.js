// Exact MusicXML import, 8 bars each. See docs/CHORDS-24.md.
(() => {
  const data=window.PIANO_DATA;
  if(!data?.bookCurricula||data.bookCurricula.some(c=>c.id==='chords-24'))return;
  if(data.exercises.length!==130||data.stages.length!==26)throw new Error('Chord studies require both adult catalogs');
  const catalog={
  "stages": [
    [
      "Nhận hình hợp âm",
      "Tay riêng, hai tay cùng lúc và hỏi đáp"
    ],
    [
      "Di chuyển thông minh",
      "Thế gần, đảo hợp âm và dẫn bè"
    ],
    [
      "Rải và phối hợp",
      "Rải tay riêng, song song và ngược hướng"
    ],
    [
      "Độc lập hai tay",
      "Giữ–rải, hai trên bốn và móc đơn"
    ],
    [
      "Kiểu đệm thực dụng",
      "Bass–hợp âm, valse, Alberti và lệch phách"
    ],
    [
      "Chơi thành âm nhạc",
      "Giai điệu, đổi vai, G7 và khúc tổng hợp"
    ]
  ],
  "exercises": [
    {
      "id": 131,
      "stage": 27,
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
        ]
      ],
      "lh": [
        [
          [
            null,
            4.0
          ]
        ],
        [
          [
            null,
            4.0
          ]
        ],
        [
          [
            null,
            4.0
          ]
        ],
        [
          [
            null,
            4.0
          ]
        ],
        [
          [
            null,
            4.0
          ]
        ],
        [
          [
            null,
            4.0
          ]
        ],
        [
          [
            null,
            4.0
          ]
        ],
        [
          [
            null,
            4.0
          ]
        ]
      ],
      "harmony": [
        "C",
        "C",
        "C",
        "C",
        "Am/C",
        "Am/C",
        "Am/C",
        "Am/C"
      ],
      "meter": 4,
      "bpm": 48,
      "title": "Ba nốt cùng vang - tay phải",
      "goal": "Đặt và nhả ba nốt cùng lúc",
      "focus": "Nhả nhẹ sau đủ 4 phách; không giữ cổ tay cứng.",
      "pass_rule": "Ba lượt liền đủ 8 ô ở tốc độ bạn giữ được (từ 40 BPM). Mốc thử của sheet: 64 BPM; không bắt buộc chạy tốc độ.",
      "variation": "Buổi sau chơi trước khi nghe mẫu; thử bắt đầu ô 3 hoặc 5. Khi quen, xen kẽ bài này với một bài đã ổn.",
      "fingers": "Số bên cạnh từng nốt theo MusicXML: 1 là ngón cái, 5 là ngón út; bậc hợp âm khác số ngón.",
      "touch": "mp, chưa dùng pedal khi học nốt và nhịp. Không cố giãn tay; nghỉ nếu đau hoặc căng.",
      "mission": {
        "title": "Ba nốt cùng vang - tay phải",
        "hand": "rh",
        "range": [
          1,
          2
        ],
        "duoRange": [
          1,
          4
        ],
        "solo": "Đọc tên hợp âm và số ngón; tập tay phải riêng ô 1–2.",
        "duo": "Nối ô 1–4 bằng đúng tay của bài; tập ô 5–8 rồi nối cả câu.",
        "finalTempo": 40,
        "finalBpm": 48,
        "labels": [
          "Tìm hình & nhịp",
          "Nối hai đoạn",
          "Chơi đủ 8 ô"
        ],
        "duoHand": "rh",
        "finalHand": "rh"
      },
      "book": {
        "id": "chords-24",
        "label": "24 bài hợp âm hai tay",
        "chapter": 1,
        "pages": [
          5
        ],
        "reference": "Bài 01 · đủ 8 ô · MusicXML gốc",
        "kind": "transcribed",
        "sourceNumber": 1,
        "musicxml": "assets/books/chords24-musicxml/01_exercise.musicxml",
        "repair": "Khoanh lỗi cụ thể; giảm 4–8 BPM và tập ô lỗi cùng ô trước/sau. Nếu bấm bị căng, nhả tay để đổi thế rồi đặt lại.",
        "steps": [
          "Đọc tên hợp âm và số ngón; tập tay phải riêng ô 1–2.",
          "Nối ô 1–4 bằng đúng tay của bài; tập ô 5–8 rồi nối cả câu.",
          "Chơi đủ 8 ô không dừng. Đúng nốt/trường độ, nhịp đều và tay thoải mái; tự nghe cân bằng."
        ],
        "review": "Kiểm tra lượt đầu hôm sau. Khi ổn, ôn khoảng ngày 3 và 7; đây là lịch gợi ý, không phải ngưỡng nghiên cứu.",
        "startBpm": 48,
        "targetBpm": 64
      }
    },
    {
      "id": 132,
      "stage": 27,
      "rh": [
        [
          [
            null,
            4.0
          ]
        ],
        [
          [
            null,
            4.0
          ]
        ],
        [
          [
            null,
            4.0
          ]
        ],
        [
          [
            null,
            4.0
          ]
        ],
        [
          [
            null,
            4.0
          ]
        ],
        [
          [
            null,
            4.0
          ]
        ],
        [
          [
            null,
            4.0
          ]
        ],
        [
          [
            null,
            4.0
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
        ]
      ],
      "harmony": [
        "C",
        "C",
        "C",
        "C",
        "Am/C",
        "Am/C",
        "Am/C",
        "Am/C"
      ],
      "meter": 4,
      "bpm": 48,
      "title": "Ba nốt cùng vang - tay trái",
      "goal": "Tay trái bấm đều các tiếng",
      "focus": "Nghe nốt giữa có vang rõ cùng hai nốt ngoài không.",
      "pass_rule": "Ba lượt liền đủ 8 ô ở tốc độ bạn giữ được (từ 40 BPM). Mốc thử của sheet: 64 BPM; không bắt buộc chạy tốc độ.",
      "variation": "Buổi sau chơi trước khi nghe mẫu; thử bắt đầu ô 3 hoặc 5. Khi quen, xen kẽ bài này với một bài đã ổn.",
      "fingers": "Số bên cạnh từng nốt theo MusicXML: 1 là ngón cái, 5 là ngón út; bậc hợp âm khác số ngón.",
      "touch": "mp, chưa dùng pedal khi học nốt và nhịp. Không cố giãn tay; nghỉ nếu đau hoặc căng.",
      "mission": {
        "title": "Ba nốt cùng vang - tay trái",
        "hand": "lh",
        "range": [
          1,
          2
        ],
        "duoRange": [
          1,
          4
        ],
        "solo": "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
        "duo": "Nối ô 1–4 bằng đúng tay của bài; tập ô 5–8 rồi nối cả câu.",
        "finalTempo": 40,
        "finalBpm": 48,
        "labels": [
          "Tìm hình & nhịp",
          "Nối hai đoạn",
          "Chơi đủ 8 ô"
        ],
        "duoHand": "lh",
        "finalHand": "lh"
      },
      "book": {
        "id": "chords-24",
        "label": "24 bài hợp âm hai tay",
        "chapter": 1,
        "pages": [
          6
        ],
        "reference": "Bài 02 · đủ 8 ô · MusicXML gốc",
        "kind": "transcribed",
        "sourceNumber": 2,
        "musicxml": "assets/books/chords24-musicxml/02_exercise.musicxml",
        "repair": "Khoanh lỗi cụ thể; giảm 4–8 BPM và tập ô lỗi cùng ô trước/sau. Nếu bấm bị căng, nhả tay để đổi thế rồi đặt lại.",
        "steps": [
          "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
          "Nối ô 1–4 bằng đúng tay của bài; tập ô 5–8 rồi nối cả câu.",
          "Chơi đủ 8 ô không dừng. Đúng nốt/trường độ, nhịp đều và tay thoải mái; tự nghe cân bằng."
        ],
        "review": "Kiểm tra lượt đầu hôm sau. Khi ổn, ôn khoảng ngày 3 và 7; đây là lịch gợi ý, không phải ngưỡng nghiên cứu.",
        "startBpm": 48,
        "targetBpm": 64
      }
    },
    {
      "id": 133,
      "stage": 27,
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
        ]
      ],
      "harmony": [
        "C",
        "C",
        "C",
        "C",
        "Am/C",
        "Am/C",
        "Am/C",
        "Am/C"
      ],
      "meter": 4,
      "bpm": 48,
      "title": "Hai bàn tay cùng đáp",
      "goal": "Hai tay vào và nhả cùng lúc",
      "focus": "Tập riêng mỗi tay, rồi ghép ở tốc độ chậm hơn.",
      "pass_rule": "Ba lượt liền đủ 8 ô ở tốc độ bạn giữ được (từ 40 BPM). Mốc thử của sheet: 64 BPM; không bắt buộc chạy tốc độ.",
      "variation": "Buổi sau chơi trước khi nghe mẫu; thử bắt đầu ô 3 hoặc 5. Khi quen, xen kẽ bài này với một bài đã ổn.",
      "fingers": "Số bên cạnh từng nốt theo MusicXML: 1 là ngón cái, 5 là ngón út; bậc hợp âm khác số ngón.",
      "touch": "mp, chưa dùng pedal khi học nốt và nhịp. Không cố giãn tay; nghỉ nếu đau hoặc căng.",
      "mission": {
        "title": "Hai bàn tay cùng đáp",
        "hand": "lh",
        "range": [
          1,
          2
        ],
        "duoRange": [
          1,
          4
        ],
        "solo": "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
        "duo": "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
        "finalTempo": 40,
        "finalBpm": 48,
        "labels": [
          "Tìm hình & nhịp",
          "Nối hai đoạn",
          "Chơi đủ 8 ô"
        ]
      },
      "book": {
        "id": "chords-24",
        "label": "24 bài hợp âm hai tay",
        "chapter": 1,
        "pages": [
          7
        ],
        "reference": "Bài 03 · đủ 8 ô · MusicXML gốc",
        "kind": "transcribed",
        "sourceNumber": 3,
        "musicxml": "assets/books/chords24-musicxml/03_exercise.musicxml",
        "repair": "Khoanh lỗi cụ thể; giảm 4–8 BPM và tập ô lỗi cùng ô trước/sau. Nếu bấm bị căng, nhả tay để đổi thế rồi đặt lại.",
        "steps": [
          "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
          "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
          "Chơi đủ 8 ô không dừng. Đúng nốt/trường độ, nhịp đều và tay thoải mái; tự nghe cân bằng."
        ],
        "review": "Kiểm tra lượt đầu hôm sau. Khi ổn, ôn khoảng ngày 3 và 7; đây là lịch gợi ý, không phải ngưỡng nghiên cứu.",
        "startBpm": 48,
        "targetBpm": 64
      }
    },
    {
      "id": 134,
      "stage": 27,
      "rh": [
        [
          [
            null,
            2.0
          ],
          [
            [
              "C4",
              "E4",
              "G4"
            ],
            2.0,
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
            null,
            2.0
          ],
          [
            [
              "C4",
              "F4",
              "A4"
            ],
            2.0,
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
            null,
            2.0
          ],
          [
            [
              "B3",
              "D4",
              "G4"
            ],
            2.0,
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
            null,
            2.0
          ],
          [
            [
              "C4",
              "E4",
              "G4"
            ],
            2.0,
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
            null,
            2.0
          ],
          [
            [
              "C4",
              "E4",
              "A4"
            ],
            2.0,
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
            null,
            2.0
          ],
          [
            [
              "D4",
              "F4",
              "A4"
            ],
            2.0,
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
            null,
            2.0
          ],
          [
            [
              "B3",
              "D4",
              "G4"
            ],
            2.0,
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
            null,
            2.0
          ],
          [
            [
              "C4",
              "E4",
              "G4"
            ],
            2.0,
            {
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
            null,
            2.0
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
            null,
            2.0
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
            null,
            2.0
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
            null,
            2.0
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
            null,
            2.0
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
            null,
            2.0
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
            null,
            2.0
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
            null,
            2.0
          ]
        ]
      ],
      "harmony": [
        "C",
        "F/C",
        "G/B",
        "C",
        "Am/C",
        "Dm",
        "G/B",
        "C"
      ],
      "meter": 4,
      "bpm": 48,
      "title": "Hỏi và đáp",
      "goal": "Luân phiên hai tay theo nửa ô nhịp",
      "focus": "Đếm 1-2 cho tay trái, 3-4 cho tay phải.",
      "pass_rule": "Ba lượt liền đủ 8 ô ở tốc độ bạn giữ được (từ 40 BPM). Mốc thử của sheet: 64 BPM; không bắt buộc chạy tốc độ.",
      "variation": "Buổi sau chơi trước khi nghe mẫu; thử bắt đầu ô 3 hoặc 5. Khi quen, xen kẽ bài này với một bài đã ổn.",
      "fingers": "Số bên cạnh từng nốt theo MusicXML: 1 là ngón cái, 5 là ngón út; bậc hợp âm khác số ngón.",
      "touch": "mp, chưa dùng pedal khi học nốt và nhịp. Không cố giãn tay; nghỉ nếu đau hoặc căng.",
      "mission": {
        "title": "Hỏi và đáp",
        "hand": "lh",
        "range": [
          1,
          2
        ],
        "duoRange": [
          1,
          4
        ],
        "solo": "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
        "duo": "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
        "finalTempo": 40,
        "finalBpm": 48,
        "labels": [
          "Tìm hình & nhịp",
          "Nối hai đoạn",
          "Chơi đủ 8 ô"
        ]
      },
      "book": {
        "id": "chords-24",
        "label": "24 bài hợp âm hai tay",
        "chapter": 1,
        "pages": [
          8
        ],
        "reference": "Bài 04 · đủ 8 ô · MusicXML gốc",
        "kind": "transcribed",
        "sourceNumber": 4,
        "musicxml": "assets/books/chords24-musicxml/04_exercise.musicxml",
        "repair": "Khoanh lỗi cụ thể; giảm 4–8 BPM và tập ô lỗi cùng ô trước/sau. Nếu bấm bị căng, nhả tay để đổi thế rồi đặt lại.",
        "steps": [
          "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
          "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
          "Chơi đủ 8 ô không dừng. Đúng nốt/trường độ, nhịp đều và tay thoải mái; tự nghe cân bằng."
        ],
        "review": "Kiểm tra lượt đầu hôm sau. Khi ổn, ôn khoảng ngày 3 và 7; đây là lịch gợi ý, không phải ngưỡng nghiên cứu.",
        "startBpm": 48,
        "targetBpm": 64
      }
    },
    {
      "id": 135,
      "stage": 28,
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
        ]
      ],
      "harmony": [
        "C",
        "F/C",
        "G/B",
        "C",
        "Am/C",
        "Dm",
        "G/B",
        "C"
      ],
      "meter": 4,
      "bpm": 48,
      "title": "C - F - G - C",
      "goal": "Đổi hợp âm bằng thế gần",
      "focus": "C-F/C-G/B giúp hạn chế nhảy tay; dấu / ghi nốt thấp nhất.",
      "pass_rule": "Ba lượt liền đủ 8 ô ở tốc độ bạn giữ được (từ 40 BPM). Mốc thử của sheet: 64 BPM; không bắt buộc chạy tốc độ.",
      "variation": "Buổi sau chơi trước khi nghe mẫu; thử bắt đầu ô 3 hoặc 5. Khi quen, xen kẽ bài này với một bài đã ổn.",
      "fingers": "Số bên cạnh từng nốt theo MusicXML: 1 là ngón cái, 5 là ngón út; bậc hợp âm khác số ngón.",
      "touch": "mp, chưa dùng pedal khi học nốt và nhịp. Không cố giãn tay; nghỉ nếu đau hoặc căng.",
      "mission": {
        "title": "C - F - G - C",
        "hand": "lh",
        "range": [
          1,
          2
        ],
        "duoRange": [
          1,
          4
        ],
        "solo": "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
        "duo": "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
        "finalTempo": 40,
        "finalBpm": 48,
        "labels": [
          "Tìm hình & nhịp",
          "Nối hai đoạn",
          "Chơi đủ 8 ô"
        ]
      },
      "book": {
        "id": "chords-24",
        "label": "24 bài hợp âm hai tay",
        "chapter": 2,
        "pages": [
          9
        ],
        "reference": "Bài 05 · đủ 8 ô · MusicXML gốc",
        "kind": "transcribed",
        "sourceNumber": 5,
        "musicxml": "assets/books/chords24-musicxml/05_exercise.musicxml",
        "repair": "Khoanh lỗi cụ thể; giảm 4–8 BPM và tập ô lỗi cùng ô trước/sau. Nếu bấm bị căng, nhả tay để đổi thế rồi đặt lại.",
        "steps": [
          "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
          "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
          "Chơi đủ 8 ô không dừng. Đúng nốt/trường độ, nhịp đều và tay thoải mái; tự nghe cân bằng."
        ],
        "review": "Kiểm tra lượt đầu hôm sau. Khi ổn, ôn khoảng ngày 3 và 7; đây là lịch gợi ý, không phải ngưỡng nghiên cứu.",
        "startBpm": 48,
        "targetBpm": 64
      }
    },
    {
      "id": 136,
      "stage": 28,
      "rh": [
        [
          [
            [
              "C4",
              "E4",
              "G4"
            ],
            2.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ],
          [
            [
              "C4",
              "E4",
              "G4"
            ],
            2.0,
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
            2.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ],
          [
            [
              "C4",
              "F4",
              "A4"
            ],
            2.0,
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
            2.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ],
          [
            [
              "B3",
              "D4",
              "G4"
            ],
            2.0,
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
            2.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ],
          [
            [
              "C4",
              "E4",
              "G4"
            ],
            2.0,
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
            2.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ],
          [
            [
              "C4",
              "E4",
              "A4"
            ],
            2.0,
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
            2.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ],
          [
            [
              "D4",
              "F4",
              "A4"
            ],
            2.0,
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
            2.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ],
          [
            [
              "B3",
              "D4",
              "G4"
            ],
            2.0,
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
            2.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ],
          [
            [
              "C4",
              "E4",
              "G4"
            ],
            2.0,
            {
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
        ]
      ],
      "harmony": [
        "C",
        "F/C",
        "G/B",
        "C",
        "Am/C",
        "Dm",
        "G/B",
        "C"
      ],
      "meter": 4,
      "bpm": 48,
      "title": "Hai lần gõ cửa",
      "goal": "Đổi hợp âm với nốt trắng",
      "focus": "Chuẩn bị hợp âm kế tiếp trong lúc đang giữ hợp âm hiện tại.",
      "pass_rule": "Ba lượt liền đủ 8 ô ở tốc độ bạn giữ được (từ 40 BPM). Mốc thử của sheet: 64 BPM; không bắt buộc chạy tốc độ.",
      "variation": "Buổi sau chơi trước khi nghe mẫu; thử bắt đầu ô 3 hoặc 5. Khi quen, xen kẽ bài này với một bài đã ổn.",
      "fingers": "Số bên cạnh từng nốt theo MusicXML: 1 là ngón cái, 5 là ngón út; bậc hợp âm khác số ngón.",
      "touch": "mp, chưa dùng pedal khi học nốt và nhịp. Không cố giãn tay; nghỉ nếu đau hoặc căng.",
      "mission": {
        "title": "Hai lần gõ cửa",
        "hand": "lh",
        "range": [
          1,
          2
        ],
        "duoRange": [
          1,
          4
        ],
        "solo": "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
        "duo": "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
        "finalTempo": 40,
        "finalBpm": 48,
        "labels": [
          "Tìm hình & nhịp",
          "Nối hai đoạn",
          "Chơi đủ 8 ô"
        ]
      },
      "book": {
        "id": "chords-24",
        "label": "24 bài hợp âm hai tay",
        "chapter": 2,
        "pages": [
          10
        ],
        "reference": "Bài 06 · đủ 8 ô · MusicXML gốc",
        "kind": "transcribed",
        "sourceNumber": 6,
        "musicxml": "assets/books/chords24-musicxml/06_exercise.musicxml",
        "repair": "Khoanh lỗi cụ thể; giảm 4–8 BPM và tập ô lỗi cùng ô trước/sau. Nếu bấm bị căng, nhả tay để đổi thế rồi đặt lại.",
        "steps": [
          "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
          "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
          "Chơi đủ 8 ô không dừng. Đúng nốt/trường độ, nhịp đều và tay thoải mái; tự nghe cân bằng."
        ],
        "review": "Kiểm tra lượt đầu hôm sau. Khi ổn, ôn khoảng ngày 3 và 7; đây là lịch gợi ý, không phải ngưỡng nghiên cứu.",
        "startBpm": 48,
        "targetBpm": 64
      }
    },
    {
      "id": 137,
      "stage": 28,
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
                3,
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
              "E4",
              "G4",
              "C5"
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
                3,
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
              "E3",
              "G3",
              "C4"
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
              "G3",
              "C4",
              "E4"
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
              "E3",
              "G3",
              "C4"
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
              "E3",
              "G3",
              "C4"
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
              "G3",
              "C4",
              "E4"
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
        ]
      ],
      "harmony": [
        "C",
        "C/E",
        "C/G",
        "C/E",
        "C",
        "C/E",
        "C/G",
        "C"
      ],
      "meter": 4,
      "bpm": 48,
      "title": "Ba khuôn mặt của C",
      "goal": "Nhận biết thể gốc và hai đảo",
      "focus": "Nhấc và chuyển cả bàn tay; không kéo giãn để giữ nốt cũ.",
      "pass_rule": "Ba lượt liền đủ 8 ô ở tốc độ bạn giữ được (từ 40 BPM). Mốc thử của sheet: 64 BPM; không bắt buộc chạy tốc độ.",
      "variation": "Buổi sau chơi trước khi nghe mẫu; thử bắt đầu ô 3 hoặc 5. Khi quen, xen kẽ bài này với một bài đã ổn.",
      "fingers": "Số bên cạnh từng nốt theo MusicXML: 1 là ngón cái, 5 là ngón út; bậc hợp âm khác số ngón.",
      "touch": "mp, chưa dùng pedal khi học nốt và nhịp. Không cố giãn tay; nghỉ nếu đau hoặc căng.",
      "mission": {
        "title": "Ba khuôn mặt của C",
        "hand": "lh",
        "range": [
          1,
          2
        ],
        "duoRange": [
          1,
          4
        ],
        "solo": "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
        "duo": "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
        "finalTempo": 40,
        "finalBpm": 48,
        "labels": [
          "Tìm hình & nhịp",
          "Nối hai đoạn",
          "Chơi đủ 8 ô"
        ]
      },
      "book": {
        "id": "chords-24",
        "label": "24 bài hợp âm hai tay",
        "chapter": 2,
        "pages": [
          11
        ],
        "reference": "Bài 07 · đủ 8 ô · MusicXML gốc",
        "kind": "transcribed",
        "sourceNumber": 7,
        "musicxml": "assets/books/chords24-musicxml/07_exercise.musicxml",
        "repair": "Khoanh lỗi cụ thể; giảm 4–8 BPM và tập ô lỗi cùng ô trước/sau. Nếu bấm bị căng, nhả tay để đổi thế rồi đặt lại.",
        "steps": [
          "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
          "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
          "Chơi đủ 8 ô không dừng. Đúng nốt/trường độ, nhịp đều và tay thoải mái; tự nghe cân bằng."
        ],
        "review": "Kiểm tra lượt đầu hôm sau. Khi ổn, ôn khoảng ngày 3 và 7; đây là lịch gợi ý, không phải ngưỡng nghiên cứu.",
        "startBpm": 48,
        "targetBpm": 64
      }
    },
    {
      "id": 138,
      "stage": 28,
      "rh": [
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
        ]
      ],
      "lh": [
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
        ]
      ],
      "harmony": [
        "Am/C",
        "Dm",
        "G/B",
        "C",
        "Am/C",
        "Dm",
        "G/B",
        "C"
      ],
      "meter": 4,
      "bpm": 48,
      "title": "Đường về ngắn",
      "goal": "Dẫn bè qua vi-ii-V-I",
      "focus": "Tìm nốt chung trước; giữ tay mềm khi đổi hình hợp âm.",
      "pass_rule": "Ba lượt liền đủ 8 ô ở tốc độ bạn giữ được (từ 40 BPM). Mốc thử của sheet: 64 BPM; không bắt buộc chạy tốc độ.",
      "variation": "Buổi sau chơi trước khi nghe mẫu; thử bắt đầu ô 3 hoặc 5. Khi quen, xen kẽ bài này với một bài đã ổn.",
      "fingers": "Số bên cạnh từng nốt theo MusicXML: 1 là ngón cái, 5 là ngón út; bậc hợp âm khác số ngón.",
      "touch": "mp, chưa dùng pedal khi học nốt và nhịp. Không cố giãn tay; nghỉ nếu đau hoặc căng.",
      "mission": {
        "title": "Đường về ngắn",
        "hand": "lh",
        "range": [
          1,
          2
        ],
        "duoRange": [
          1,
          4
        ],
        "solo": "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
        "duo": "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
        "finalTempo": 40,
        "finalBpm": 48,
        "labels": [
          "Tìm hình & nhịp",
          "Nối hai đoạn",
          "Chơi đủ 8 ô"
        ]
      },
      "book": {
        "id": "chords-24",
        "label": "24 bài hợp âm hai tay",
        "chapter": 2,
        "pages": [
          12
        ],
        "reference": "Bài 08 · đủ 8 ô · MusicXML gốc",
        "kind": "transcribed",
        "sourceNumber": 8,
        "musicxml": "assets/books/chords24-musicxml/08_exercise.musicxml",
        "repair": "Khoanh lỗi cụ thể; giảm 4–8 BPM và tập ô lỗi cùng ô trước/sau. Nếu bấm bị căng, nhả tay để đổi thế rồi đặt lại.",
        "steps": [
          "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
          "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
          "Chơi đủ 8 ô không dừng. Đúng nốt/trường độ, nhịp đều và tay thoải mái; tự nghe cân bằng."
        ],
        "review": "Kiểm tra lượt đầu hôm sau. Khi ổn, ôn khoảng ngày 3 và 7; đây là lịch gợi ý, không phải ngưỡng nghiên cứu.",
        "startBpm": 48,
        "targetBpm": 64
      }
    },
    {
      "id": 139,
      "stage": 29,
      "rh": [
        [
          [
            "C4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "C4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "F4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "A4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "F4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "B3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "D4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "D4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "C4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "C4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "A4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "D4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "F4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "A4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "F4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "B3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "D4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "D4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "C4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ]
        ]
      ],
      "lh": [
        [
          [
            null,
            4.0
          ]
        ],
        [
          [
            null,
            4.0
          ]
        ],
        [
          [
            null,
            4.0
          ]
        ],
        [
          [
            null,
            4.0
          ]
        ],
        [
          [
            null,
            4.0
          ]
        ],
        [
          [
            null,
            4.0
          ]
        ],
        [
          [
            null,
            4.0
          ]
        ],
        [
          [
            null,
            4.0
          ]
        ]
      ],
      "harmony": [
        "C",
        "F/C",
        "G/B",
        "C",
        "Am/C",
        "Dm",
        "G/B",
        "C"
      ],
      "meter": 4,
      "bpm": 48,
      "title": "Bậc thang phải",
      "goal": "Rải 1-3-5-3 bằng tay phải",
      "focus": "Nghe bốn nốt có độ lớn tương tự, không dằn ngón cái.",
      "pass_rule": "Ba lượt liền đủ 8 ô ở tốc độ bạn giữ được (từ 40 BPM). Mốc thử của sheet: 64 BPM; không bắt buộc chạy tốc độ.",
      "variation": "Buổi sau chơi trước khi nghe mẫu; thử bắt đầu ô 3 hoặc 5. Khi quen, xen kẽ bài này với một bài đã ổn.",
      "fingers": "Số bên cạnh từng nốt theo MusicXML: 1 là ngón cái, 5 là ngón út; bậc hợp âm khác số ngón.",
      "touch": "mp, chưa dùng pedal khi học nốt và nhịp. Không cố giãn tay; nghỉ nếu đau hoặc căng.",
      "mission": {
        "title": "Bậc thang phải",
        "hand": "rh",
        "range": [
          1,
          2
        ],
        "duoRange": [
          1,
          4
        ],
        "solo": "Đọc tên hợp âm và số ngón; tập tay phải riêng ô 1–2.",
        "duo": "Nối ô 1–4 bằng đúng tay của bài; tập ô 5–8 rồi nối cả câu.",
        "finalTempo": 40,
        "finalBpm": 48,
        "labels": [
          "Tìm hình & nhịp",
          "Nối hai đoạn",
          "Chơi đủ 8 ô"
        ],
        "duoHand": "rh",
        "finalHand": "rh"
      },
      "book": {
        "id": "chords-24",
        "label": "24 bài hợp âm hai tay",
        "chapter": 3,
        "pages": [
          13
        ],
        "reference": "Bài 09 · đủ 8 ô · MusicXML gốc",
        "kind": "transcribed",
        "sourceNumber": 9,
        "musicxml": "assets/books/chords24-musicxml/09_exercise.musicxml",
        "repair": "Khoanh lỗi cụ thể; giảm 4–8 BPM và tập ô lỗi cùng ô trước/sau. Nếu bấm bị căng, nhả tay để đổi thế rồi đặt lại.",
        "steps": [
          "Đọc tên hợp âm và số ngón; tập tay phải riêng ô 1–2.",
          "Nối ô 1–4 bằng đúng tay của bài; tập ô 5–8 rồi nối cả câu.",
          "Chơi đủ 8 ô không dừng. Đúng nốt/trường độ, nhịp đều và tay thoải mái; tự nghe cân bằng."
        ],
        "review": "Kiểm tra lượt đầu hôm sau. Khi ổn, ôn khoảng ngày 3 và 7; đây là lịch gợi ý, không phải ngưỡng nghiên cứu.",
        "startBpm": 48,
        "targetBpm": 64
      }
    },
    {
      "id": 140,
      "stage": 29,
      "rh": [
        [
          [
            null,
            4.0
          ]
        ],
        [
          [
            null,
            4.0
          ]
        ],
        [
          [
            null,
            4.0
          ]
        ],
        [
          [
            null,
            4.0
          ]
        ],
        [
          [
            null,
            4.0
          ]
        ],
        [
          [
            null,
            4.0
          ]
        ],
        [
          [
            null,
            4.0
          ]
        ],
        [
          [
            null,
            4.0
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
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E3",
            1.0,
            {
              "finger": 3
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
            "F3",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "A3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "F3",
            1.0,
            {
              "finger": 3
            }
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
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "D3",
            1.0,
            {
              "finger": 3
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
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E3",
            1.0,
            {
              "finger": 3
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
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "A3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E3",
            1.0,
            {
              "finger": 3
            }
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
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "A3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "F3",
            1.0,
            {
              "finger": 3
            }
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
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "D3",
            1.0,
            {
              "finger": 3
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
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E3",
            1.0,
            {
              "finger": 3
            }
          ]
        ]
      ],
      "harmony": [
        "C",
        "F/C",
        "G/B",
        "C",
        "Am/C",
        "Dm",
        "G/B",
        "C"
      ],
      "meter": 4,
      "bpm": 48,
      "title": "Bậc thang trái",
      "goal": "Rải 1-3-5-3 bằng tay trái",
      "focus": "Số 5-3-1-3 là ngón tay, không phải bậc hợp âm.",
      "pass_rule": "Ba lượt liền đủ 8 ô ở tốc độ bạn giữ được (từ 40 BPM). Mốc thử của sheet: 64 BPM; không bắt buộc chạy tốc độ.",
      "variation": "Buổi sau chơi trước khi nghe mẫu; thử bắt đầu ô 3 hoặc 5. Khi quen, xen kẽ bài này với một bài đã ổn.",
      "fingers": "Số bên cạnh từng nốt theo MusicXML: 1 là ngón cái, 5 là ngón út; bậc hợp âm khác số ngón.",
      "touch": "mp, chưa dùng pedal khi học nốt và nhịp. Không cố giãn tay; nghỉ nếu đau hoặc căng.",
      "mission": {
        "title": "Bậc thang trái",
        "hand": "lh",
        "range": [
          1,
          2
        ],
        "duoRange": [
          1,
          4
        ],
        "solo": "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
        "duo": "Nối ô 1–4 bằng đúng tay của bài; tập ô 5–8 rồi nối cả câu.",
        "finalTempo": 40,
        "finalBpm": 48,
        "labels": [
          "Tìm hình & nhịp",
          "Nối hai đoạn",
          "Chơi đủ 8 ô"
        ],
        "duoHand": "lh",
        "finalHand": "lh"
      },
      "book": {
        "id": "chords-24",
        "label": "24 bài hợp âm hai tay",
        "chapter": 3,
        "pages": [
          14
        ],
        "reference": "Bài 10 · đủ 8 ô · MusicXML gốc",
        "kind": "transcribed",
        "sourceNumber": 10,
        "musicxml": "assets/books/chords24-musicxml/10_exercise.musicxml",
        "repair": "Khoanh lỗi cụ thể; giảm 4–8 BPM và tập ô lỗi cùng ô trước/sau. Nếu bấm bị căng, nhả tay để đổi thế rồi đặt lại.",
        "steps": [
          "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
          "Nối ô 1–4 bằng đúng tay của bài; tập ô 5–8 rồi nối cả câu.",
          "Chơi đủ 8 ô không dừng. Đúng nốt/trường độ, nhịp đều và tay thoải mái; tự nghe cân bằng."
        ],
        "review": "Kiểm tra lượt đầu hôm sau. Khi ổn, ôn khoảng ngày 3 và 7; đây là lịch gợi ý, không phải ngưỡng nghiên cứu.",
        "startBpm": 48,
        "targetBpm": 64
      }
    },
    {
      "id": 141,
      "stage": 29,
      "rh": [
        [
          [
            "C4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "C4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "F4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "A4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "F4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "B3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "D4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "D4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "C4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "C4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "A4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "D4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "F4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "A4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "F4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "B3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "D4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "D4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "C4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
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
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E3",
            1.0,
            {
              "finger": 3
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
            "F3",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "A3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "F3",
            1.0,
            {
              "finger": 3
            }
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
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "D3",
            1.0,
            {
              "finger": 3
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
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E3",
            1.0,
            {
              "finger": 3
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
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "A3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E3",
            1.0,
            {
              "finger": 3
            }
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
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "A3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "F3",
            1.0,
            {
              "finger": 3
            }
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
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "D3",
            1.0,
            {
              "finger": 3
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
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E3",
            1.0,
            {
              "finger": 3
            }
          ]
        ]
      ],
      "harmony": [
        "C",
        "F/C",
        "G/B",
        "C",
        "Am/C",
        "Dm",
        "G/B",
        "C"
      ],
      "meter": 4,
      "bpm": 48,
      "title": "Hai dòng cùng chảy",
      "goal": "Hai tay rải song song",
      "focus": "Ghép từng phách; hai nốt tương ứng rơi cùng thời điểm.",
      "pass_rule": "Ba lượt liền đủ 8 ô ở tốc độ bạn giữ được (từ 40 BPM). Mốc thử của sheet: 64 BPM; không bắt buộc chạy tốc độ.",
      "variation": "Buổi sau chơi trước khi nghe mẫu; thử bắt đầu ô 3 hoặc 5. Khi quen, xen kẽ bài này với một bài đã ổn.",
      "fingers": "Số bên cạnh từng nốt theo MusicXML: 1 là ngón cái, 5 là ngón út; bậc hợp âm khác số ngón.",
      "touch": "mp, chưa dùng pedal khi học nốt và nhịp. Không cố giãn tay; nghỉ nếu đau hoặc căng.",
      "mission": {
        "title": "Hai dòng cùng chảy",
        "hand": "lh",
        "range": [
          1,
          2
        ],
        "duoRange": [
          1,
          4
        ],
        "solo": "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
        "duo": "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
        "finalTempo": 40,
        "finalBpm": 48,
        "labels": [
          "Tìm hình & nhịp",
          "Nối hai đoạn",
          "Chơi đủ 8 ô"
        ]
      },
      "book": {
        "id": "chords-24",
        "label": "24 bài hợp âm hai tay",
        "chapter": 3,
        "pages": [
          15
        ],
        "reference": "Bài 11 · đủ 8 ô · MusicXML gốc",
        "kind": "transcribed",
        "sourceNumber": 11,
        "musicxml": "assets/books/chords24-musicxml/11_exercise.musicxml",
        "repair": "Khoanh lỗi cụ thể; giảm 4–8 BPM và tập ô lỗi cùng ô trước/sau. Nếu bấm bị căng, nhả tay để đổi thế rồi đặt lại.",
        "steps": [
          "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
          "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
          "Chơi đủ 8 ô không dừng. Đúng nốt/trường độ, nhịp đều và tay thoải mái; tự nghe cân bằng."
        ],
        "review": "Kiểm tra lượt đầu hôm sau. Khi ổn, ôn khoảng ngày 3 và 7; đây là lịch gợi ý, không phải ngưỡng nghiên cứu.",
        "startBpm": 48,
        "targetBpm": 64
      }
    },
    {
      "id": 142,
      "stage": 29,
      "rh": [
        [
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "C4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "A4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "F4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "C4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "F4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "D4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "B3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "D4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "C4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "A4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "C4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "A4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "F4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "D4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "F4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "D4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "B3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "D4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "C4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
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
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E3",
            1.0,
            {
              "finger": 3
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
            "F3",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "A3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "F3",
            1.0,
            {
              "finger": 3
            }
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
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "D3",
            1.0,
            {
              "finger": 3
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
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E3",
            1.0,
            {
              "finger": 3
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
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "A3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E3",
            1.0,
            {
              "finger": 3
            }
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
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "A3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "F3",
            1.0,
            {
              "finger": 3
            }
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
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "D3",
            1.0,
            {
              "finger": 3
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
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E3",
            1.0,
            {
              "finger": 3
            }
          ]
        ]
      ],
      "harmony": [
        "C",
        "F/C",
        "G/B",
        "C",
        "Am/C",
        "Dm",
        "G/B",
        "C"
      ],
      "meter": 4,
      "bpm": 48,
      "title": "Đổi chiều",
      "goal": "Hai tay rải theo hướng ngược nhau",
      "focus": "Trái 1-3-5-3 theo bậc; phải 5-3-1-3 theo bậc.",
      "pass_rule": "Ba lượt liền đủ 8 ô ở tốc độ bạn giữ được (từ 40 BPM). Mốc thử của sheet: 64 BPM; không bắt buộc chạy tốc độ.",
      "variation": "Buổi sau chơi trước khi nghe mẫu; thử bắt đầu ô 3 hoặc 5. Khi quen, xen kẽ bài này với một bài đã ổn.",
      "fingers": "Số bên cạnh từng nốt theo MusicXML: 1 là ngón cái, 5 là ngón út; bậc hợp âm khác số ngón.",
      "touch": "mp, chưa dùng pedal khi học nốt và nhịp. Không cố giãn tay; nghỉ nếu đau hoặc căng.",
      "mission": {
        "title": "Đổi chiều",
        "hand": "lh",
        "range": [
          1,
          2
        ],
        "duoRange": [
          1,
          4
        ],
        "solo": "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
        "duo": "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
        "finalTempo": 40,
        "finalBpm": 48,
        "labels": [
          "Tìm hình & nhịp",
          "Nối hai đoạn",
          "Chơi đủ 8 ô"
        ]
      },
      "book": {
        "id": "chords-24",
        "label": "24 bài hợp âm hai tay",
        "chapter": 3,
        "pages": [
          16
        ],
        "reference": "Bài 12 · đủ 8 ô · MusicXML gốc",
        "kind": "transcribed",
        "sourceNumber": 12,
        "musicxml": "assets/books/chords24-musicxml/12_exercise.musicxml",
        "repair": "Khoanh lỗi cụ thể; giảm 4–8 BPM và tập ô lỗi cùng ô trước/sau. Nếu bấm bị căng, nhả tay để đổi thế rồi đặt lại.",
        "steps": [
          "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
          "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
          "Chơi đủ 8 ô không dừng. Đúng nốt/trường độ, nhịp đều và tay thoải mái; tự nghe cân bằng."
        ],
        "review": "Kiểm tra lượt đầu hôm sau. Khi ổn, ôn khoảng ngày 3 và 7; đây là lịch gợi ý, không phải ngưỡng nghiên cứu.",
        "startBpm": 48,
        "targetBpm": 64
      }
    },
    {
      "id": 143,
      "stage": 30,
      "rh": [
        [
          [
            "C4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "C4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "F4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "A4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "F4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "B3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "D4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "D4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "C4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "C4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "A4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "D4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "F4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "A4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "F4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "B3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "D4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "D4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "C4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
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
        ]
      ],
      "harmony": [
        "C",
        "F/C",
        "G/B",
        "C",
        "Am/C",
        "Dm",
        "G/B",
        "C"
      ],
      "meter": 4,
      "bpm": 48,
      "title": "Nền yên - dòng chảy",
      "goal": "Trái giữ hợp âm, phải rải",
      "focus": "Tay trái giữ đủ ô nhịp trong khi tay phải tiếp tục chuyển động.",
      "pass_rule": "Ba lượt liền đủ 8 ô ở tốc độ bạn giữ được (từ 40 BPM). Mốc thử của sheet: 64 BPM; không bắt buộc chạy tốc độ.",
      "variation": "Buổi sau chơi trước khi nghe mẫu; thử bắt đầu ô 3 hoặc 5. Khi quen, xen kẽ bài này với một bài đã ổn.",
      "fingers": "Số bên cạnh từng nốt theo MusicXML: 1 là ngón cái, 5 là ngón út; bậc hợp âm khác số ngón.",
      "touch": "mp, chưa dùng pedal khi học nốt và nhịp. Không cố giãn tay; nghỉ nếu đau hoặc căng.",
      "mission": {
        "title": "Nền yên - dòng chảy",
        "hand": "lh",
        "range": [
          1,
          2
        ],
        "duoRange": [
          1,
          4
        ],
        "solo": "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
        "duo": "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
        "finalTempo": 40,
        "finalBpm": 48,
        "labels": [
          "Tìm hình & nhịp",
          "Nối hai đoạn",
          "Chơi đủ 8 ô"
        ]
      },
      "book": {
        "id": "chords-24",
        "label": "24 bài hợp âm hai tay",
        "chapter": 4,
        "pages": [
          17
        ],
        "reference": "Bài 13 · đủ 8 ô · MusicXML gốc",
        "kind": "transcribed",
        "sourceNumber": 13,
        "musicxml": "assets/books/chords24-musicxml/13_exercise.musicxml",
        "repair": "Khoanh lỗi cụ thể; giảm 4–8 BPM và tập ô lỗi cùng ô trước/sau. Nếu bấm bị căng, nhả tay để đổi thế rồi đặt lại.",
        "steps": [
          "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
          "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
          "Chơi đủ 8 ô không dừng. Đúng nốt/trường độ, nhịp đều và tay thoải mái; tự nghe cân bằng."
        ],
        "review": "Kiểm tra lượt đầu hôm sau. Khi ổn, ôn khoảng ngày 3 và 7; đây là lịch gợi ý, không phải ngưỡng nghiên cứu.",
        "startBpm": 48,
        "targetBpm": 64
      }
    },
    {
      "id": 144,
      "stage": 30,
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
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E3",
            1.0,
            {
              "finger": 3
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
            "F3",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "A3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "F3",
            1.0,
            {
              "finger": 3
            }
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
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "D3",
            1.0,
            {
              "finger": 3
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
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E3",
            1.0,
            {
              "finger": 3
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
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "A3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E3",
            1.0,
            {
              "finger": 3
            }
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
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "A3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "F3",
            1.0,
            {
              "finger": 3
            }
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
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "D3",
            1.0,
            {
              "finger": 3
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
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E3",
            1.0,
            {
              "finger": 3
            }
          ]
        ]
      ],
      "harmony": [
        "C",
        "F/C",
        "G/B",
        "C",
        "Am/C",
        "Dm",
        "G/B",
        "C"
      ],
      "meter": 4,
      "bpm": 48,
      "title": "Đổi vai",
      "goal": "Phải giữ hợp âm, trái rải",
      "focus": "Không nhả tay phải theo từng nốt của tay trái.",
      "pass_rule": "Ba lượt liền đủ 8 ô ở tốc độ bạn giữ được (từ 40 BPM). Mốc thử của sheet: 64 BPM; không bắt buộc chạy tốc độ.",
      "variation": "Buổi sau chơi trước khi nghe mẫu; thử bắt đầu ô 3 hoặc 5. Khi quen, xen kẽ bài này với một bài đã ổn.",
      "fingers": "Số bên cạnh từng nốt theo MusicXML: 1 là ngón cái, 5 là ngón út; bậc hợp âm khác số ngón.",
      "touch": "mp, chưa dùng pedal khi học nốt và nhịp. Không cố giãn tay; nghỉ nếu đau hoặc căng.",
      "mission": {
        "title": "Đổi vai",
        "hand": "rh",
        "range": [
          1,
          2
        ],
        "duoRange": [
          1,
          4
        ],
        "solo": "Đọc tên hợp âm và số ngón; tập tay phải riêng ô 1–2.",
        "duo": "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
        "finalTempo": 40,
        "finalBpm": 48,
        "labels": [
          "Tìm hình & nhịp",
          "Nối hai đoạn",
          "Chơi đủ 8 ô"
        ]
      },
      "book": {
        "id": "chords-24",
        "label": "24 bài hợp âm hai tay",
        "chapter": 4,
        "pages": [
          18
        ],
        "reference": "Bài 14 · đủ 8 ô · MusicXML gốc",
        "kind": "transcribed",
        "sourceNumber": 14,
        "musicxml": "assets/books/chords24-musicxml/14_exercise.musicxml",
        "repair": "Khoanh lỗi cụ thể; giảm 4–8 BPM và tập ô lỗi cùng ô trước/sau. Nếu bấm bị căng, nhả tay để đổi thế rồi đặt lại.",
        "steps": [
          "Đọc tên hợp âm và số ngón; tập tay phải riêng ô 1–2.",
          "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
          "Chơi đủ 8 ô không dừng. Đúng nốt/trường độ, nhịp đều và tay thoải mái; tự nghe cân bằng."
        ],
        "review": "Kiểm tra lượt đầu hôm sau. Khi ổn, ôn khoảng ngày 3 và 7; đây là lịch gợi ý, không phải ngưỡng nghiên cứu.",
        "startBpm": 48,
        "targetBpm": 64
      }
    },
    {
      "id": 145,
      "stage": 30,
      "rh": [
        [
          [
            "C4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "C4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "F4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "A4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "F4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "B3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "D4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "D4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "C4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "C4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "A4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "D4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "F4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "A4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "F4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "B3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "D4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "D4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "C4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
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
        ]
      ],
      "harmony": [
        "C",
        "F/C",
        "G/B",
        "C",
        "Am/C",
        "Dm",
        "G/B",
        "C"
      ],
      "meter": 4,
      "bpm": 48,
      "title": "Hai trên bốn",
      "goal": "Trái nốt trắng, phải nốt đen",
      "focus": "Trái vào ở phách 1 và 3; phải vào đủ bốn phách.",
      "pass_rule": "Ba lượt liền đủ 8 ô ở tốc độ bạn giữ được (từ 40 BPM). Mốc thử của sheet: 64 BPM; không bắt buộc chạy tốc độ.",
      "variation": "Buổi sau chơi trước khi nghe mẫu; thử bắt đầu ô 3 hoặc 5. Khi quen, xen kẽ bài này với một bài đã ổn.",
      "fingers": "Số bên cạnh từng nốt theo MusicXML: 1 là ngón cái, 5 là ngón út; bậc hợp âm khác số ngón.",
      "touch": "mp, chưa dùng pedal khi học nốt và nhịp. Không cố giãn tay; nghỉ nếu đau hoặc căng.",
      "mission": {
        "title": "Hai trên bốn",
        "hand": "lh",
        "range": [
          1,
          2
        ],
        "duoRange": [
          1,
          4
        ],
        "solo": "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
        "duo": "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
        "finalTempo": 40,
        "finalBpm": 48,
        "labels": [
          "Tìm hình & nhịp",
          "Nối hai đoạn",
          "Chơi đủ 8 ô"
        ]
      },
      "book": {
        "id": "chords-24",
        "label": "24 bài hợp âm hai tay",
        "chapter": 4,
        "pages": [
          19
        ],
        "reference": "Bài 15 · đủ 8 ô · MusicXML gốc",
        "kind": "transcribed",
        "sourceNumber": 15,
        "musicxml": "assets/books/chords24-musicxml/15_exercise.musicxml",
        "repair": "Khoanh lỗi cụ thể; giảm 4–8 BPM và tập ô lỗi cùng ô trước/sau. Nếu bấm bị căng, nhả tay để đổi thế rồi đặt lại.",
        "steps": [
          "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
          "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
          "Chơi đủ 8 ô không dừng. Đúng nốt/trường độ, nhịp đều và tay thoải mái; tự nghe cân bằng."
        ],
        "review": "Kiểm tra lượt đầu hôm sau. Khi ổn, ôn khoảng ngày 3 và 7; đây là lịch gợi ý, không phải ngưỡng nghiên cứu.",
        "startBpm": 48,
        "targetBpm": 64
      }
    },
    {
      "id": 146,
      "stage": 30,
      "rh": [
        [
          [
            "C4",
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "E4",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "C4",
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "E4",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            0.5,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "C4",
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "F4",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "A4",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "F4",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "C4",
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "F4",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "A4",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "F4",
            0.5,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "B3",
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "D4",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "D4",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "B3",
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "D4",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "D4",
            0.5,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "C4",
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "E4",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "C4",
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "E4",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            0.5,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "C4",
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "E4",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "A4",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "C4",
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "E4",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "A4",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            0.5,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "D4",
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "F4",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "A4",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "F4",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "D4",
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "F4",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "A4",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "F4",
            0.5,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "B3",
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "D4",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "D4",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "B3",
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "D4",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "D4",
            0.5,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "C4",
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "E4",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "C4",
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "E4",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            0.5,
            {
              "finger": 3
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
        ]
      ],
      "harmony": [
        "C",
        "F/C",
        "G/B",
        "C",
        "Am/C",
        "Dm",
        "G/B",
        "C"
      ],
      "meter": 4,
      "bpm": 44,
      "title": "Nhẹ bước tám",
      "goal": "Rải móc đơn đều trên nền giữ",
      "focus": "Đếm 1-và-2-và-3-và-4-và; móc đơn nhanh gấp đôi nốt đen.",
      "pass_rule": "Ba lượt liền đủ 8 ô ở tốc độ bạn giữ được (từ 40 BPM). Mốc thử của sheet: 60 BPM; không bắt buộc chạy tốc độ.",
      "variation": "Buổi sau chơi trước khi nghe mẫu; thử bắt đầu ô 3 hoặc 5. Khi quen, xen kẽ bài này với một bài đã ổn.",
      "fingers": "Số bên cạnh từng nốt theo MusicXML: 1 là ngón cái, 5 là ngón út; bậc hợp âm khác số ngón.",
      "touch": "mp, chưa dùng pedal khi học nốt và nhịp. Không cố giãn tay; nghỉ nếu đau hoặc căng.",
      "mission": {
        "title": "Nhẹ bước tám",
        "hand": "lh",
        "range": [
          1,
          2
        ],
        "duoRange": [
          1,
          4
        ],
        "solo": "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
        "duo": "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
        "finalTempo": 40,
        "finalBpm": 44,
        "labels": [
          "Tìm hình & nhịp",
          "Nối hai đoạn",
          "Chơi đủ 8 ô"
        ]
      },
      "book": {
        "id": "chords-24",
        "label": "24 bài hợp âm hai tay",
        "chapter": 4,
        "pages": [
          20
        ],
        "reference": "Bài 16 · đủ 8 ô · MusicXML gốc",
        "kind": "transcribed",
        "sourceNumber": 16,
        "musicxml": "assets/books/chords24-musicxml/16_exercise.musicxml",
        "repair": "Khoanh lỗi cụ thể; giảm 4–8 BPM và tập ô lỗi cùng ô trước/sau. Nếu bấm bị căng, nhả tay để đổi thế rồi đặt lại.",
        "steps": [
          "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
          "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
          "Chơi đủ 8 ô không dừng. Đúng nốt/trường độ, nhịp đều và tay thoải mái; tự nghe cân bằng."
        ],
        "review": "Kiểm tra lượt đầu hôm sau. Khi ổn, ôn khoảng ngày 3 và 7; đây là lịch gợi ý, không phải ngưỡng nghiên cứu.",
        "startBpm": 44,
        "targetBpm": 60
      }
    },
    {
      "id": 147,
      "stage": 31,
      "rh": [
        [
          [
            null,
            1.0
          ],
          [
            [
              "C4",
              "E4",
              "G4"
            ],
            1.0,
            {
              "fingers": [
                1,
                3,
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
              "C4",
              "E4",
              "G4"
            ],
            1.0,
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
            null,
            1.0
          ],
          [
            [
              "C4",
              "F4",
              "A4"
            ],
            1.0,
            {
              "fingers": [
                1,
                3,
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
              "C4",
              "F4",
              "A4"
            ],
            1.0,
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
            null,
            1.0
          ],
          [
            [
              "B3",
              "D4",
              "G4"
            ],
            1.0,
            {
              "fingers": [
                1,
                3,
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
              "B3",
              "D4",
              "G4"
            ],
            1.0,
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
            null,
            1.0
          ],
          [
            [
              "C4",
              "E4",
              "G4"
            ],
            1.0,
            {
              "fingers": [
                1,
                3,
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
              "C4",
              "E4",
              "G4"
            ],
            1.0,
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
            null,
            1.0
          ],
          [
            [
              "C4",
              "E4",
              "A4"
            ],
            1.0,
            {
              "fingers": [
                1,
                3,
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
              "C4",
              "E4",
              "A4"
            ],
            1.0,
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
            null,
            1.0
          ],
          [
            [
              "D4",
              "F4",
              "A4"
            ],
            1.0,
            {
              "fingers": [
                1,
                3,
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
              "F4",
              "A4"
            ],
            1.0,
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
            null,
            1.0
          ],
          [
            [
              "B3",
              "D4",
              "G4"
            ],
            1.0,
            {
              "fingers": [
                1,
                3,
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
              "B3",
              "D4",
              "G4"
            ],
            1.0,
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
            null,
            1.0
          ],
          [
            [
              "C4",
              "E4",
              "G4"
            ],
            1.0,
            {
              "fingers": [
                1,
                3,
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
              "C4",
              "E4",
              "G4"
            ],
            1.0,
            {
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
            1.0,
            {
              "finger": 1
            }
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
            1.0,
            {
              "finger": 1
            }
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
            1.0,
            {
              "finger": 1
            }
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
            1.0,
            {
              "finger": 1
            }
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
            1.0,
            {
              "finger": 1
            }
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
            1.0,
            {
              "finger": 1
            }
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
            1.0,
            {
              "finger": 1
            }
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
            1.0,
            {
              "finger": 1
            }
          ],
          [
            null,
            1.0
          ]
        ]
      ],
      "harmony": [
        "C",
        "F/C",
        "G/B",
        "C",
        "Am/C",
        "Dm",
        "G/B",
        "C"
      ],
      "meter": 4,
      "bpm": 48,
      "title": "Bước chân và tiếng chuông",
      "goal": "Bass phách mạnh, hợp âm phách yếu",
      "focus": "Trái ở 1,3; phải ở 2,4. Giữ nhịp qua khoảng lặng.",
      "pass_rule": "Ba lượt liền đủ 8 ô ở tốc độ bạn giữ được (từ 40 BPM). Mốc thử của sheet: 64 BPM; không bắt buộc chạy tốc độ.",
      "variation": "Buổi sau chơi trước khi nghe mẫu; thử bắt đầu ô 3 hoặc 5. Khi quen, xen kẽ bài này với một bài đã ổn.",
      "fingers": "Số bên cạnh từng nốt theo MusicXML: 1 là ngón cái, 5 là ngón út; bậc hợp âm khác số ngón.",
      "touch": "mp, chưa dùng pedal khi học nốt và nhịp. Không cố giãn tay; nghỉ nếu đau hoặc căng.",
      "mission": {
        "title": "Bước chân và tiếng chuông",
        "hand": "lh",
        "range": [
          1,
          2
        ],
        "duoRange": [
          1,
          4
        ],
        "solo": "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
        "duo": "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
        "finalTempo": 40,
        "finalBpm": 48,
        "labels": [
          "Tìm hình & nhịp",
          "Nối hai đoạn",
          "Chơi đủ 8 ô"
        ]
      },
      "book": {
        "id": "chords-24",
        "label": "24 bài hợp âm hai tay",
        "chapter": 5,
        "pages": [
          21
        ],
        "reference": "Bài 17 · đủ 8 ô · MusicXML gốc",
        "kind": "transcribed",
        "sourceNumber": 17,
        "musicxml": "assets/books/chords24-musicxml/17_exercise.musicxml",
        "repair": "Khoanh lỗi cụ thể; giảm 4–8 BPM và tập ô lỗi cùng ô trước/sau. Nếu bấm bị căng, nhả tay để đổi thế rồi đặt lại.",
        "steps": [
          "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
          "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
          "Chơi đủ 8 ô không dừng. Đúng nốt/trường độ, nhịp đều và tay thoải mái; tự nghe cân bằng."
        ],
        "review": "Kiểm tra lượt đầu hôm sau. Khi ổn, ôn khoảng ngày 3 và 7; đây là lịch gợi ý, không phải ngưỡng nghiên cứu.",
        "startBpm": 48,
        "targetBpm": 64
      }
    },
    {
      "id": 148,
      "stage": 31,
      "rh": [
        [
          [
            null,
            1.0
          ],
          [
            [
              "C4",
              "E4",
              "G4"
            ],
            1.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ],
          [
            [
              "C4",
              "E4",
              "G4"
            ],
            1.0,
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
            null,
            1.0
          ],
          [
            [
              "C4",
              "F4",
              "A4"
            ],
            1.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ],
          [
            [
              "C4",
              "F4",
              "A4"
            ],
            1.0,
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
            null,
            1.0
          ],
          [
            [
              "B3",
              "D4",
              "G4"
            ],
            1.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ],
          [
            [
              "B3",
              "D4",
              "G4"
            ],
            1.0,
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
            null,
            1.0
          ],
          [
            [
              "C4",
              "E4",
              "G4"
            ],
            1.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ],
          [
            [
              "C4",
              "E4",
              "G4"
            ],
            1.0,
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
            null,
            1.0
          ],
          [
            [
              "C4",
              "E4",
              "A4"
            ],
            1.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ],
          [
            [
              "C4",
              "E4",
              "A4"
            ],
            1.0,
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
            null,
            1.0
          ],
          [
            [
              "D4",
              "F4",
              "A4"
            ],
            1.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ],
          [
            [
              "D4",
              "F4",
              "A4"
            ],
            1.0,
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
            null,
            1.0
          ],
          [
            [
              "B3",
              "D4",
              "G4"
            ],
            1.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ],
          [
            [
              "B3",
              "D4",
              "G4"
            ],
            1.0,
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
            null,
            1.0
          ],
          [
            [
              "C4",
              "E4",
              "G4"
            ],
            1.0,
            {
              "fingers": [
                1,
                3,
                5
              ]
            }
          ],
          [
            [
              "C4",
              "E4",
              "G4"
            ],
            1.0,
            {
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
            1.0,
            {
              "finger": 5
            }
          ],
          [
            null,
            2.0
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
            2.0
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
            2.0
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
            2.0
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
            2.0
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
            2.0
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
            2.0
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
            2.0
          ]
        ]
      ],
      "harmony": [
        "C",
        "F/C",
        "G/B",
        "C",
        "Am/C",
        "Dm",
        "G/B",
        "C"
      ],
      "meter": 3,
      "bpm": 48,
      "title": "Điệu valse nhỏ",
      "goal": "Đệm bass-hợp âm-hợp âm trong 3/4",
      "focus": "Đếm 1-2-3; phách 1 rõ hơn một chút, 2 và 3 nhẹ.",
      "pass_rule": "Ba lượt liền đủ 8 ô ở tốc độ bạn giữ được (từ 40 BPM). Mốc thử của sheet: 64 BPM; không bắt buộc chạy tốc độ.",
      "variation": "Buổi sau chơi trước khi nghe mẫu; thử bắt đầu ô 3 hoặc 5. Khi quen, xen kẽ bài này với một bài đã ổn.",
      "fingers": "Số bên cạnh từng nốt theo MusicXML: 1 là ngón cái, 5 là ngón út; bậc hợp âm khác số ngón.",
      "touch": "mp, chưa dùng pedal khi học nốt và nhịp. Không cố giãn tay; nghỉ nếu đau hoặc căng.",
      "mission": {
        "title": "Điệu valse nhỏ",
        "hand": "lh",
        "range": [
          1,
          2
        ],
        "duoRange": [
          1,
          4
        ],
        "solo": "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
        "duo": "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
        "finalTempo": 40,
        "finalBpm": 48,
        "labels": [
          "Tìm hình & nhịp",
          "Nối hai đoạn",
          "Chơi đủ 8 ô"
        ]
      },
      "book": {
        "id": "chords-24",
        "label": "24 bài hợp âm hai tay",
        "chapter": 5,
        "pages": [
          22
        ],
        "reference": "Bài 18 · đủ 8 ô · MusicXML gốc",
        "kind": "transcribed",
        "sourceNumber": 18,
        "musicxml": "assets/books/chords24-musicxml/18_exercise.musicxml",
        "repair": "Khoanh lỗi cụ thể; giảm 4–8 BPM và tập ô lỗi cùng ô trước/sau. Nếu bấm bị căng, nhả tay để đổi thế rồi đặt lại.",
        "steps": [
          "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
          "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
          "Chơi đủ 8 ô không dừng. Đúng nốt/trường độ, nhịp đều và tay thoải mái; tự nghe cân bằng."
        ],
        "review": "Kiểm tra lượt đầu hôm sau. Khi ổn, ôn khoảng ngày 3 và 7; đây là lịch gợi ý, không phải ngưỡng nghiên cứu.",
        "startBpm": 48,
        "targetBpm": 64
      }
    },
    {
      "id": 149,
      "stage": 31,
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
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "E3",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "C3",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "G3",
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "E3",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            0.5,
            {
              "finger": 1
            }
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
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "F3",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "A3",
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "C3",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "A3",
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "F3",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "A3",
            0.5,
            {
              "finger": 1
            }
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
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "D3",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "B2",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "G3",
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "D3",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            0.5,
            {
              "finger": 1
            }
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
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "E3",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "C3",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "G3",
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "E3",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            0.5,
            {
              "finger": 1
            }
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
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "E3",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "A3",
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "C3",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "A3",
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "E3",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "A3",
            0.5,
            {
              "finger": 1
            }
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
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "F3",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "A3",
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "D3",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "A3",
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "F3",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "A3",
            0.5,
            {
              "finger": 1
            }
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
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "D3",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "B2",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "G3",
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "D3",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            0.5,
            {
              "finger": 1
            }
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
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "E3",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "C3",
            0.5,
            {
              "finger": 5
            }
          ],
          [
            "G3",
            0.5,
            {
              "finger": 1
            }
          ],
          [
            "E3",
            0.5,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            0.5,
            {
              "finger": 1
            }
          ]
        ]
      ],
      "harmony": [
        "C",
        "F/C",
        "G/B",
        "C",
        "Am/C",
        "Dm",
        "G/B",
        "C"
      ],
      "meter": 4,
      "bpm": 44,
      "title": "Dòng Alberti",
      "goal": "Trái thấp-cao-giữa-cao",
      "focus": "Trái nhẹ; đừng làm nốt cao của mẫu đệm lấn tay phải.",
      "pass_rule": "Ba lượt liền đủ 8 ô ở tốc độ bạn giữ được (từ 40 BPM). Mốc thử của sheet: 60 BPM; không bắt buộc chạy tốc độ.",
      "variation": "Buổi sau chơi trước khi nghe mẫu; thử bắt đầu ô 3 hoặc 5. Khi quen, xen kẽ bài này với một bài đã ổn.",
      "fingers": "Số bên cạnh từng nốt theo MusicXML: 1 là ngón cái, 5 là ngón út; bậc hợp âm khác số ngón.",
      "touch": "mp, chưa dùng pedal khi học nốt và nhịp. Không cố giãn tay; nghỉ nếu đau hoặc căng.",
      "mission": {
        "title": "Dòng Alberti",
        "hand": "lh",
        "range": [
          1,
          2
        ],
        "duoRange": [
          1,
          4
        ],
        "solo": "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
        "duo": "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
        "finalTempo": 40,
        "finalBpm": 44,
        "labels": [
          "Tìm hình & nhịp",
          "Nối hai đoạn",
          "Chơi đủ 8 ô"
        ]
      },
      "book": {
        "id": "chords-24",
        "label": "24 bài hợp âm hai tay",
        "chapter": 5,
        "pages": [
          23
        ],
        "reference": "Bài 19 · đủ 8 ô · MusicXML gốc",
        "kind": "transcribed",
        "sourceNumber": 19,
        "musicxml": "assets/books/chords24-musicxml/19_exercise.musicxml",
        "repair": "Khoanh lỗi cụ thể; giảm 4–8 BPM và tập ô lỗi cùng ô trước/sau. Nếu bấm bị căng, nhả tay để đổi thế rồi đặt lại.",
        "steps": [
          "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
          "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
          "Chơi đủ 8 ô không dừng. Đúng nốt/trường độ, nhịp đều và tay thoải mái; tự nghe cân bằng."
        ],
        "review": "Kiểm tra lượt đầu hôm sau. Khi ổn, ôn khoảng ngày 3 và 7; đây là lịch gợi ý, không phải ngưỡng nghiên cứu.",
        "startBpm": 44,
        "targetBpm": 60
      }
    },
    {
      "id": 150,
      "stage": 31,
      "rh": [
        [
          [
            null,
            0.5
          ],
          [
            [
              "C4",
              "E4",
              "G4"
            ],
            0.5,
            {
              "fingers": [
                1,
                3,
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
              "C4",
              "E4",
              "G4"
            ],
            0.5,
            {
              "fingers": [
                1,
                3,
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
              "C4",
              "E4",
              "G4"
            ],
            0.5,
            {
              "fingers": [
                1,
                3,
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
              "C4",
              "E4",
              "G4"
            ],
            0.5,
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
            null,
            0.5
          ],
          [
            [
              "C4",
              "F4",
              "A4"
            ],
            0.5,
            {
              "fingers": [
                1,
                3,
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
              "C4",
              "F4",
              "A4"
            ],
            0.5,
            {
              "fingers": [
                1,
                3,
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
              "C4",
              "F4",
              "A4"
            ],
            0.5,
            {
              "fingers": [
                1,
                3,
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
              "C4",
              "F4",
              "A4"
            ],
            0.5,
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
            null,
            0.5
          ],
          [
            [
              "B3",
              "D4",
              "G4"
            ],
            0.5,
            {
              "fingers": [
                1,
                3,
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
              "B3",
              "D4",
              "G4"
            ],
            0.5,
            {
              "fingers": [
                1,
                3,
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
              "B3",
              "D4",
              "G4"
            ],
            0.5,
            {
              "fingers": [
                1,
                3,
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
              "B3",
              "D4",
              "G4"
            ],
            0.5,
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
            null,
            0.5
          ],
          [
            [
              "C4",
              "E4",
              "G4"
            ],
            0.5,
            {
              "fingers": [
                1,
                3,
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
              "C4",
              "E4",
              "G4"
            ],
            0.5,
            {
              "fingers": [
                1,
                3,
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
              "C4",
              "E4",
              "G4"
            ],
            0.5,
            {
              "fingers": [
                1,
                3,
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
              "C4",
              "E4",
              "G4"
            ],
            0.5,
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
            null,
            0.5
          ],
          [
            [
              "C4",
              "E4",
              "A4"
            ],
            0.5,
            {
              "fingers": [
                1,
                3,
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
              "C4",
              "E4",
              "A4"
            ],
            0.5,
            {
              "fingers": [
                1,
                3,
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
              "C4",
              "E4",
              "A4"
            ],
            0.5,
            {
              "fingers": [
                1,
                3,
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
              "C4",
              "E4",
              "A4"
            ],
            0.5,
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
            null,
            0.5
          ],
          [
            [
              "D4",
              "F4",
              "A4"
            ],
            0.5,
            {
              "fingers": [
                1,
                3,
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
              "F4",
              "A4"
            ],
            0.5,
            {
              "fingers": [
                1,
                3,
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
              "F4",
              "A4"
            ],
            0.5,
            {
              "fingers": [
                1,
                3,
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
              "F4",
              "A4"
            ],
            0.5,
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
            null,
            0.5
          ],
          [
            [
              "B3",
              "D4",
              "G4"
            ],
            0.5,
            {
              "fingers": [
                1,
                3,
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
              "B3",
              "D4",
              "G4"
            ],
            0.5,
            {
              "fingers": [
                1,
                3,
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
              "B3",
              "D4",
              "G4"
            ],
            0.5,
            {
              "fingers": [
                1,
                3,
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
              "B3",
              "D4",
              "G4"
            ],
            0.5,
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
            null,
            0.5
          ],
          [
            [
              "C4",
              "E4",
              "G4"
            ],
            0.5,
            {
              "fingers": [
                1,
                3,
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
              "C4",
              "E4",
              "G4"
            ],
            0.5,
            {
              "fingers": [
                1,
                3,
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
              "C4",
              "E4",
              "G4"
            ],
            0.5,
            {
              "fingers": [
                1,
                3,
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
              "C4",
              "E4",
              "G4"
            ],
            0.5,
            {
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
        ]
      ],
      "harmony": [
        "C",
        "F/C",
        "G/B",
        "C",
        "Am/C",
        "Dm",
        "G/B",
        "C"
      ],
      "meter": 4,
      "bpm": 40,
      "title": "Khoảng lặng có nhịp",
      "goal": "Hợp âm phải vào ở nửa sau mỗi phách",
      "focus": "Đếm thành tiếng chữ và; giữ metronome đánh nốt đen.",
      "pass_rule": "Ba lượt liền đủ 8 ô ở tốc độ bạn giữ được (từ 40 BPM). Mốc thử của sheet: 56 BPM; không bắt buộc chạy tốc độ.",
      "variation": "Buổi sau chơi trước khi nghe mẫu; thử bắt đầu ô 3 hoặc 5. Khi quen, xen kẽ bài này với một bài đã ổn.",
      "fingers": "Số bên cạnh từng nốt theo MusicXML: 1 là ngón cái, 5 là ngón út; bậc hợp âm khác số ngón.",
      "touch": "mp, chưa dùng pedal khi học nốt và nhịp. Không cố giãn tay; nghỉ nếu đau hoặc căng.",
      "mission": {
        "title": "Khoảng lặng có nhịp",
        "hand": "rh",
        "range": [
          1,
          2
        ],
        "duoRange": [
          1,
          4
        ],
        "solo": "Đọc tên hợp âm và số ngón; tập tay phải riêng ô 1–2.",
        "duo": "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
        "finalTempo": 40,
        "finalBpm": 40,
        "labels": [
          "Tìm hình & nhịp",
          "Nối hai đoạn",
          "Chơi đủ 8 ô"
        ]
      },
      "book": {
        "id": "chords-24",
        "label": "24 bài hợp âm hai tay",
        "chapter": 5,
        "pages": [
          24
        ],
        "reference": "Bài 20 · đủ 8 ô · MusicXML gốc",
        "kind": "transcribed",
        "sourceNumber": 20,
        "musicxml": "assets/books/chords24-musicxml/20_exercise.musicxml",
        "repair": "Khoanh lỗi cụ thể; giảm 4–8 BPM và tập ô lỗi cùng ô trước/sau. Nếu bấm bị căng, nhả tay để đổi thế rồi đặt lại.",
        "steps": [
          "Đọc tên hợp âm và số ngón; tập tay phải riêng ô 1–2.",
          "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
          "Chơi đủ 8 ô không dừng. Đúng nốt/trường độ, nhịp đều và tay thoải mái; tự nghe cân bằng."
        ],
        "review": "Kiểm tra lượt đầu hôm sau. Khi ổn, ôn khoảng ngày 3 và 7; đây là lịch gợi ý, không phải ngưỡng nghiên cứu.",
        "startBpm": 40,
        "targetBpm": 56
      }
    },
    {
      "id": 151,
      "stage": 32,
      "rh": [
        [
          [
            "C4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "A4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "F4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "C4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "F4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "D4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "D4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "B3",
            1.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "C4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "C4",
            1.0,
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
              "finger": 1
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "A4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "A4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "F4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "D4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "F4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "D4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "D4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "B3",
            1.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "C4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "C4",
            1.0,
            {
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
        ]
      ],
      "harmony": [
        "C",
        "F/C",
        "G/B",
        "C",
        "Am/C",
        "Dm",
        "G/B",
        "C"
      ],
      "meter": 4,
      "bpm": 48,
      "title": "Giai điệu trên nền hợp âm",
      "goal": "Phải hát rõ, trái giữ nhẹ",
      "focus": "Nghe đường giai điệu phải nổi hơn nền tay trái.",
      "pass_rule": "Ba lượt liền đủ 8 ô ở tốc độ bạn giữ được (từ 40 BPM). Mốc thử của sheet: 64 BPM; không bắt buộc chạy tốc độ.",
      "variation": "Buổi sau chơi trước khi nghe mẫu; thử bắt đầu ô 3 hoặc 5. Khi quen, xen kẽ bài này với một bài đã ổn.",
      "fingers": "Số bên cạnh từng nốt theo MusicXML: 1 là ngón cái, 5 là ngón út; bậc hợp âm khác số ngón.",
      "touch": "mp, chưa dùng pedal khi học nốt và nhịp. Không cố giãn tay; nghỉ nếu đau hoặc căng.",
      "mission": {
        "title": "Giai điệu trên nền hợp âm",
        "hand": "lh",
        "range": [
          1,
          2
        ],
        "duoRange": [
          1,
          4
        ],
        "solo": "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
        "duo": "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
        "finalTempo": 40,
        "finalBpm": 48,
        "labels": [
          "Tìm hình & nhịp",
          "Nối hai đoạn",
          "Chơi đủ 8 ô"
        ]
      },
      "book": {
        "id": "chords-24",
        "label": "24 bài hợp âm hai tay",
        "chapter": 6,
        "pages": [
          25
        ],
        "reference": "Bài 21 · đủ 8 ô · MusicXML gốc",
        "kind": "transcribed",
        "sourceNumber": 21,
        "musicxml": "assets/books/chords24-musicxml/21_exercise.musicxml",
        "repair": "Khoanh lỗi cụ thể; giảm 4–8 BPM và tập ô lỗi cùng ô trước/sau. Nếu bấm bị căng, nhả tay để đổi thế rồi đặt lại.",
        "steps": [
          "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
          "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
          "Chơi đủ 8 ô không dừng. Đúng nốt/trường độ, nhịp đều và tay thoải mái; tự nghe cân bằng."
        ],
        "review": "Kiểm tra lượt đầu hôm sau. Khi ổn, ôn khoảng ngày 3 và 7; đây là lịch gợi ý, không phải ngưỡng nghiên cứu.",
        "startBpm": 48,
        "targetBpm": 64
      },
      "performance": {
        "rh": {
          "gate": 0.98
        },
        "lh": {
          "gain": 0.6
        }
      }
    },
    {
      "id": 152,
      "stage": 32,
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
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E3",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "A3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "F3",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "C3",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "F3",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "D3",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "D3",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "B2",
            1.0,
            {
              "finger": 5
            }
          ]
        ],
        [
          [
            "G3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E3",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "C3",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "C3",
            1.0,
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
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "A3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E3",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "A3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "F3",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "D3",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "F3",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "D3",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "D3",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "B2",
            1.0,
            {
              "finger": 5
            }
          ]
        ],
        [
          [
            "G3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E3",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "C3",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "C3",
            1.0,
            {
              "finger": 5
            }
          ]
        ]
      ],
      "harmony": [
        "C",
        "F/C",
        "G/B",
        "C",
        "Am/C",
        "Dm",
        "G/B",
        "C"
      ],
      "meter": 4,
      "bpm": 48,
      "title": "Giai điệu ở tay trái",
      "goal": "Đổi vai nghe giữa hai bàn tay",
      "focus": "Nghe giai điệu tay trái rõ hơn hợp âm tay phải.",
      "pass_rule": "Ba lượt liền đủ 8 ô ở tốc độ bạn giữ được (từ 40 BPM). Mốc thử của sheet: 64 BPM; không bắt buộc chạy tốc độ.",
      "variation": "Buổi sau chơi trước khi nghe mẫu; thử bắt đầu ô 3 hoặc 5. Khi quen, xen kẽ bài này với một bài đã ổn.",
      "fingers": "Số bên cạnh từng nốt theo MusicXML: 1 là ngón cái, 5 là ngón út; bậc hợp âm khác số ngón.",
      "touch": "mp, chưa dùng pedal khi học nốt và nhịp. Không cố giãn tay; nghỉ nếu đau hoặc căng.",
      "mission": {
        "title": "Giai điệu ở tay trái",
        "hand": "rh",
        "range": [
          1,
          2
        ],
        "duoRange": [
          1,
          4
        ],
        "solo": "Đọc tên hợp âm và số ngón; tập tay phải riêng ô 1–2.",
        "duo": "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
        "finalTempo": 40,
        "finalBpm": 48,
        "labels": [
          "Tìm hình & nhịp",
          "Nối hai đoạn",
          "Chơi đủ 8 ô"
        ]
      },
      "book": {
        "id": "chords-24",
        "label": "24 bài hợp âm hai tay",
        "chapter": 6,
        "pages": [
          26
        ],
        "reference": "Bài 22 · đủ 8 ô · MusicXML gốc",
        "kind": "transcribed",
        "sourceNumber": 22,
        "musicxml": "assets/books/chords24-musicxml/22_exercise.musicxml",
        "repair": "Khoanh lỗi cụ thể; giảm 4–8 BPM và tập ô lỗi cùng ô trước/sau. Nếu bấm bị căng, nhả tay để đổi thế rồi đặt lại.",
        "steps": [
          "Đọc tên hợp âm và số ngón; tập tay phải riêng ô 1–2.",
          "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
          "Chơi đủ 8 ô không dừng. Đúng nốt/trường độ, nhịp đều và tay thoải mái; tự nghe cân bằng."
        ],
        "review": "Kiểm tra lượt đầu hôm sau. Khi ổn, ôn khoảng ngày 3 và 7; đây là lịch gợi ý, không phải ngưỡng nghiên cứu.",
        "startBpm": 48,
        "targetBpm": 64
      },
      "performance": {
        "rh": {
          "gain": 0.6
        },
        "lh": {
          "gate": 0.98
        }
      }
    },
    {
      "id": 153,
      "stage": 32,
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
              "F4",
              "G4"
            ],
            4.0,
            {
              "fingers": [
                1,
                2,
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
              "F4",
              "G4"
            ],
            4.0,
            {
              "fingers": [
                1,
                2,
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
            "C3",
            4.0,
            {
              "finger": 5
            }
          ]
        ]
      ],
      "harmony": [
        "C",
        "F/C",
        "G7/B",
        "C",
        "C",
        "F/C",
        "G7/B",
        "C"
      ],
      "meter": 4,
      "bpm": 44,
      "title": "Lời hẹn trở về",
      "goal": "Bốn nốt G7 giải quyết về C",
      "focus": "Bốn nốt G7/B nằm trong quãng sáu; thử rải nếu bấm bị căng.",
      "pass_rule": "Ba lượt liền đủ 8 ô ở tốc độ bạn giữ được (từ 40 BPM). Mốc thử của sheet: 60 BPM; không bắt buộc chạy tốc độ.",
      "variation": "Buổi sau chơi trước khi nghe mẫu; thử bắt đầu ô 3 hoặc 5. Khi quen, xen kẽ bài này với một bài đã ổn.",
      "fingers": "Số bên cạnh từng nốt theo MusicXML: 1 là ngón cái, 5 là ngón út; bậc hợp âm khác số ngón.",
      "touch": "mp, chưa dùng pedal khi học nốt và nhịp. Không cố giãn tay; nghỉ nếu đau hoặc căng.",
      "mission": {
        "title": "Lời hẹn trở về",
        "hand": "rh",
        "range": [
          1,
          2
        ],
        "duoRange": [
          1,
          4
        ],
        "solo": "Đọc tên hợp âm và số ngón; tập tay phải riêng ô 1–2.",
        "duo": "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
        "finalTempo": 40,
        "finalBpm": 44,
        "labels": [
          "Tìm hình & nhịp",
          "Nối hai đoạn",
          "Chơi đủ 8 ô"
        ]
      },
      "book": {
        "id": "chords-24",
        "label": "24 bài hợp âm hai tay",
        "chapter": 6,
        "pages": [
          27
        ],
        "reference": "Bài 23 · đủ 8 ô · MusicXML gốc",
        "kind": "transcribed",
        "sourceNumber": 23,
        "musicxml": "assets/books/chords24-musicxml/23_exercise.musicxml",
        "repair": "Khoanh lỗi cụ thể; giảm 4–8 BPM và tập ô lỗi cùng ô trước/sau. Nếu bấm bị căng, nhả tay để đổi thế rồi đặt lại.",
        "steps": [
          "Đọc tên hợp âm và số ngón; tập tay phải riêng ô 1–2.",
          "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
          "Chơi đủ 8 ô không dừng. Đúng nốt/trường độ, nhịp đều và tay thoải mái; tự nghe cân bằng."
        ],
        "review": "Kiểm tra lượt đầu hôm sau. Khi ổn, ôn khoảng ngày 3 và 7; đây là lịch gợi ý, không phải ngưỡng nghiên cứu.",
        "startBpm": 44,
        "targetBpm": 60
      }
    },
    {
      "id": 154,
      "stage": 32,
      "rh": [
        [
          [
            "C4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "A4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "F4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "C4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "F4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "D4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "D4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "B3",
            1.0,
            {
              "finger": 1
            }
          ]
        ],
        [
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "C4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "C4",
            1.0,
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
              "finger": 1
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "A4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "E4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "A4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "F4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "D4",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "F4",
            1.0,
            {
              "finger": 3
            }
          ]
        ],
        [
          [
            "D4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G4",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "D4",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "B3",
            1.0,
            {
              "finger": 1
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
            "C3",
            1.0,
            {
              "finger": 5
            }
          ],
          [
            "A3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "E3",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "A3",
            1.0,
            {
              "finger": 1
            }
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
            "A3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "F3",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "A3",
            1.0,
            {
              "finger": 1
            }
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
            "G3",
            1.0,
            {
              "finger": 1
            }
          ],
          [
            "D3",
            1.0,
            {
              "finger": 3
            }
          ],
          [
            "G3",
            1.0,
            {
              "finger": 1
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
        ]
      ],
      "harmony": [
        "C",
        "F/C",
        "G/B",
        "C",
        "Am/C",
        "Dm",
        "G/B",
        "C"
      ],
      "meter": 4,
      "bpm": 44,
      "title": "Khúc nhỏ tổng hợp",
      "goal": "Kết hợp giai điệu, rải và kết câu",
      "focus": "Tập ô 1-2, 3-4, 5-6, 7-8; sau đó nối từng cặp đoạn.",
      "pass_rule": "Ba lượt liền đủ 8 ô ở tốc độ bạn giữ được (từ 40 BPM). Mốc thử của sheet: 64 BPM; không bắt buộc chạy tốc độ.",
      "variation": "Buổi sau chơi trước khi nghe mẫu; thử bắt đầu ô 3 hoặc 5. Khi quen, xen kẽ bài này với một bài đã ổn.",
      "fingers": "Số bên cạnh từng nốt theo MusicXML: 1 là ngón cái, 5 là ngón út; bậc hợp âm khác số ngón.",
      "touch": "mp, chưa dùng pedal khi học nốt và nhịp. Không cố giãn tay; nghỉ nếu đau hoặc căng.",
      "mission": {
        "title": "Khúc nhỏ tổng hợp",
        "hand": "lh",
        "range": [
          1,
          2
        ],
        "duoRange": [
          1,
          4
        ],
        "solo": "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
        "duo": "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
        "finalTempo": 40,
        "finalBpm": 44,
        "labels": [
          "Tìm hình & nhịp",
          "Nối hai đoạn",
          "Chơi đủ 8 ô"
        ]
      },
      "book": {
        "id": "chords-24",
        "label": "24 bài hợp âm hai tay",
        "chapter": 6,
        "pages": [
          28
        ],
        "reference": "Bài 24 · đủ 8 ô · MusicXML gốc",
        "kind": "transcribed",
        "sourceNumber": 24,
        "musicxml": "assets/books/chords24-musicxml/24_exercise.musicxml",
        "repair": "Khoanh lỗi cụ thể; giảm 4–8 BPM và tập ô lỗi cùng ô trước/sau. Nếu bấm bị căng, nhả tay để đổi thế rồi đặt lại.",
        "steps": [
          "Đọc tên hợp âm và số ngón; tập tay trái riêng ô 1–2.",
          "Nối ô 1–4 chậm; tập ô 5–8 riêng bằng thanh chọn đoạn, rồi ghép các đoạn.",
          "Chơi đủ 8 ô không dừng. Đúng nốt/trường độ, nhịp đều và tay thoải mái; tự nghe cân bằng."
        ],
        "review": "Kiểm tra lượt đầu hôm sau. Khi ổn, ôn khoảng ngày 3 và 7; đây là lịch gợi ý, không phải ngưỡng nghiên cứu.",
        "startBpm": 44,
        "targetBpm": 64
      },
      "performance": {
        "rh": {
          "gate": 0.98
        },
        "lh": {
          "gain": 0.6
        }
      }
    }
  ]
};
  data.stages.push(...catalog.stages);data.exercises.push(...catalog.exercises);
  data.bookCurricula.push({"id": "chords-24", "title": "24 bài hợp âm hai tay", "source": "assets/books/piano-24-hop-am-hai-tay.pdf", "lessonIds": [131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154], "firstStage": 27, "stageCount": 6, "mapId": "chords24-course-map"});
})();
