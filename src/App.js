import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import Question from './Component/Question';
import 'bootstrap/dist/css/bootstrap.min.css'; // 引入 Bootstrap 樣式

function App() {
  // 1. 先定義所有 state
  const [answers, setAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [randomValue, setRandomValue] = useState(null);
  const [videoRef, setVideoRef] = useState(null);
  const [isVideoStarted, setIsVideoStarted] = useState(false);
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  // 2. 定義常數
  const totalSections = 5;

  // 3. 定義問題陣列
  const questions = useMemo(() => [
    {
      section: 1,
      question: "AI 影片展示",
      type: "video",
      videoSrc: process.env.PUBLIC_URL + '/video/AIvideo.mp4',
      videoSize: randomValue === 1 ? "100%" : "50%", // 根據隨機值決定影片大小
      options: "請觀看以下影片，然後回答問題"
    },
    {
      section: 1,
      id: 1,
      question: "您認為影片的大小是否合適？",
      type: "radio",
      options: ['太大', '稍大', '剛好', '稍小', '太小']
    },
    {
      section: 1,
      id: 2,
      question: "影片的清晰度如何？",
      type: "radio",
      options: ['非常清晰', '清晰', '普通', '模糊', '非常模糊']
    },
    {
      section: 1,
      id: 3,
      question: "您覺得影片的播放速度如何？",
      type: "radio",
      options: ['太快', '稍快', '適中', '稍慢', '太慢']
    },
    {
      section: 1,
      id: 4,
      question: "您對影片的整體觀看體驗滿意度如何？",
      type: "radio",
      options: ['非常滿意', '滿意', '普通', '不滿意', '非常不滿意']
    },
    {
      section: 2,
      id: 5,
      question: "您認為影片的哪些方面需要改進？（可多選）",
      type: "checkbox",
      options: ['影片大小', '播放速度', '清晰度', '音質', '內容長度'],
      imageSrc:process.env.PUBLIC_URL + '/images/img03.png'
    },
    {
      section: 3,
      id: 6,
      question: "您是否注意到影片的大小變化？",
      type: "radio",
      options: ['有明顯感覺', '有一點感覺', '沒特別注意', '完全沒感覺'],
    },
    {
      section: 3,
      id: 7,
      question: "您願意花多少時間觀看這個影片？",
      type: "number"
    },
    {
      section: 3,
      id: 8,
      question: "您認為影片的內容是否容易理解？",
      type: "radio",
      options: ['非常容易', '容易', '普通', '困難', '非常困難']
    },
    {
      section: 3,
      id: 9,
      question: "您是否會推薦這個影片給其他人？",
      type: "radio",
      options: ['一定會', '可能會', '不一定', '可能不會', '一定不會']
    },
    {
      section: 3,
      id: 10,
      question: "您認為影片的資訊量是否適中？",
      type: "radio",
      options: ['太多', '稍多', '適中', '稍少', '太少']
    },
    {
      section: 3,
      id: 11,
      question: "您對影片的互動性滿意度如何？",
      type: "radio",
      options: ['非常滿意', '滿意', '普通', '不滿意', '非常不滿意']
    },
    {
      section: 3,
      id: 12,
      question: "您認為影片的節奏是否合適？",
      type: "radio",
      options: ['太快', '稍快', '適中', '稍慢', '太慢']
    },
    {
      section: 4,
      id: 13,
      question: "您出生為西元?",
      type: "number"
    },
    {
      section: 4,
      id: 14,
      question: "您的性別為?",
      type: "radio",
      options: ['生理男', '生理女']
    },
    {
      section: 4,
      id: 15,
      question: "您的教育背景為?",
      type: "radio",
      options: ['社會科學院', '文/法學院', '商管學院', '理工學院', '海學院', '藝術/音樂學院', '醫(護)學院', '其他']
    },
    {
      section: 4,
      id: 16,
      question: "您的最高學歷為?",
      type: "radio",
      options: ['國中小', '高中', '大專院校', '碩博士']
    },
    {
      section: 4,
      id: 17,
      question: "您平常每天使用電腦的時間約為?",
      options: { min: 0, max: 24, step: 1 },
      type: "range"
    },
    {
      section: 4,
      id: 18,
      question: "您的工作產業為?",
      type: "checkbox",
      options: ['軍警', '公務人員', '教育', '商', '工', '農', '醫療', '服務業', '家管', '學生', '退休', '資訊業', '其他']
    }
  ], [randomValue]); // 加入 randomValue 作為依賴

  // 4. 計算實際問題數量
  const totalQuestions = useMemo(() => {
    return questions.filter(q => q.type !== "video").length;
  }, [questions]); // 加入 questions 作為依賴

  // 5. 其他函數和邏輯
  const generateRandomValue = () => {
    const random = Math.floor(Math.random() * 2) + 1;
    setRandomValue(random);
  };

  useEffect(() => {
    generateRandomValue();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer
    }));
  };

  // 處理多選的變化
  const handleCheckboxChange = (questionId, isChecked, option) => {
    setAnswers(prevAnswers => {
      if (isChecked) {
        return {
          ...prevAnswers,
          [questionId]: [...(prevAnswers[questionId] || []), option]
        };
      } else {
        return {
          ...prevAnswers,
          [questionId]: (prevAnswers[questionId] || []).filter(item => item !== option)
        };
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 計算實際已回答的問題數量（不包括影片）
    
    // 若不是最後一頁，擋掉錯誤提交
    if (currentPage !== totalSections - 1) {
      alert("請先完成所有區塊，再按提交！");
      return;
    }
    const answeredCount = Object.keys(answers).length;
    if(answeredCount !== totalQuestions) {
      alert(`請確保所有問題都已經回答完畢！(已回答 ${answeredCount}/${totalQuestions} 題)`);
      return;
    }
    fetch('https://script.google.com/macros/s/AKfycbxGo5MlaB_0xH_eE58zMSiPH7ZO70Q9faaRAHDtL1kdPK1992PRD7DdsbWTlCVQuBM/exec', {
      method: 'POST',
      body: JSON.stringify(answers)
    })
      .then(response => {
        if (response.ok) {
          setSubmitted(true);
        }
      })
      .catch(error => {
        console.error('Error submitting answers:', error);
      });
      
      setSubmitted(true);
  };

  const handleStartVideo = () => {
    if (videoRef) {
      videoRef.play();
      setIsVideoStarted(true);
    }
  };

  const handleVideoEnded = () => {
    setIsVideoEnded(true);
  };

  // 處理頁面切換
  const handlePageChange = (page) => {
    if (page < 0 || page >= totalSections) {
      return;
    }
  
    // ⛔ 不要直接跳過驗證
    // ✅ 應該根據目前頁面（currentPage）做 section 對應
    const sectionForCurrentPage = currentPage === 0 ? 1 : currentPage;
  
    const currentSectionQuestions = questions.filter(question =>
      question.section === sectionForCurrentPage && question.type !== "video"
    );
  
    const isAllAnswered = currentSectionQuestions.every(question => {
      if (!question.id) return true;
      const value = answers[question.id];
      return value !== undefined && value !== '' && !(Array.isArray(value) && value.length === 0);
    });
  
    if (!isAllAnswered) {
      console.warn('⚠️ 區塊未完成，以下是該區塊題目與回答情況：');
      currentSectionQuestions.forEach(q => {
        const value = answers[q.id];
        console.log(`題目ID: ${q.id}, 題目內容: ${q.question}`);
        console.log(`→ 回答內容:`, value === undefined || (Array.isArray(value) && value.length === 0) ? '❌ 尚未作答' : `✅ ${JSON.stringify(value)}`);
      });
  
      alert('請完成本區塊所有問題後再繼續！');
      return;
    }
  
    setCurrentPage(page);
  };
  

  // 節的過濾函數
  const filteredQuestions = questions.filter(question => {
    // 如果是第一頁（currentPage === 0），顯示影片
    if (currentPage === 0) return false;
    // 其他頁面正常過濾
    return question.section === currentPage;
  });
  
  return (
    <div className="App">
      <header className="App-header">
        {submitted ? (
          <div>
            <h2>感謝您的作答！</h2>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="question-section">
              {/* 第一頁只顯示影片和下一頁按鈕 */}
              {currentPage === 0 && (
                <div style={{ width: questions[0].videoSize, margin: '0 auto' }}>
                  <video
                    ref={setVideoRef}
                    width="100%"
                    controls
                    playsInline
                    onEnded={handleVideoEnded}
                    src={questions[0].videoSrc}
                    style={{ display: 'block', margin: '0 auto' }}
                  />
                  <p>{questions[0].options}</p>
                  {!isVideoStarted ? (
                    <button
                      type="button"
                      onClick={handleStartVideo}
                      className="btn btn-primary"
                      style={{ marginTop: '20px', marginRight: '10px' }}
                    >
                      開始播放
                    </button>
                  ) : isVideoEnded ? (
                    <button
                      type="button"
                      onClick={() => handlePageChange(1)}
                      className="btn btn-primary"
                      style={{ marginTop: '20px' }}
                    >
                      下一頁
                    </button>
                  ) : (
                    <p style={{ marginTop: '20px', color: '#666' }}>請觀看完影片後繼續</p>
                  )}
                </div>
              )}

              {/* 第二頁開始才顯示問卷題目 */}
              {currentPage > 0 &&
                questions.filter(question => question.section === currentPage).map((question, index) => (
                  <div key={question.id}>
                    <Question
                      questionId={question.id}
                      question={question.question}
                      type={question.type}
                      options={question.options}
                      imageSrc={question.imageSrc}
                      handleAnswerChange={handleAnswerChange}
                      handleCheckboxChange={question.type === 'checkbox' ? handleCheckboxChange : null}
                      {...question}
                    />
                  </div>
                ))
              }
            </div>

            {/* 分頁按鈕邏輯 */}
            {currentPage > 0 && currentPage < totalSections - 1 && (
              <button type="button" onClick={() => handlePageChange(currentPage + 1)} className="btn btn-primary">下一頁</button>
            )}
            {currentPage === totalSections - 1 && (
              <button type="submit" className="btn btn-primary">提交答案</button>
            )}
          </form>
        )}
      </header>
    </div>
  );
}

export default App;