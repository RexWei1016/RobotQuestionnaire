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
  const totalSections = 6; // 更新為 6 個區塊：影片展示 + 5 個問題區塊

  // 3. 定義問題陣列
  const questions = useMemo(() => [
    {
      section: 0, // 獨立出影片展示區塊
      question: "AI 影片展示",
      type: "video",
      videoSrc: randomValue <= 2 ? 'https://rexwei1016.github.io/RobotQuestionnaire/video/AIvideo.mp4' : 'https://rexwei1016.github.io/RobotQuestionnaire/video/AIVideo2.mp4',
      videoSize: randomValue % 2 === 1 ? "100%" : "50%", // 根據隨機值決定影片大小
      options: "請觀看以下影片，然後回答問題"
    },
    {
      section: 1,
      id: 1,
      question: "我覺得這個 AI 角色太靠近我了，讓我感到有些壓迫感。",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 1,
      id: 2,
      question: "這個 AI 角色讓我產生被監視或被盯著看的不舒服感。",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 1,
      id: 3,
      question: "與這個 AI 角色互動時，我會下意識地更小心自己說什麼。",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 1,
      id: 4,
      question: "這個 AI 角色讓我覺得有點難以放鬆或安心地溝通。",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 2,
      id: 5,
      question: "我認為這個 AI 客服是值得信任的。",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 2,
      id: 6,
      question: "我相信這個 AI 客服提供的資訊是正確的。",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 2,
      id: 7,
      question: "如果這個 AI 提供建議，我會願意參考或遵從。",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 2,
      id: 8,
      question: "整體而言，我感覺這個 AI 客服是可靠的。",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 3,
      id: 9,
      question: "這個 AI 角色讓我感覺它離我非常近。",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 3,
      id: 10,
      question: "它出現在畫面上的方式讓我感覺它幾乎入侵我的個人空間。",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 3,
      id: 11,
      question: "我感覺這個 AI 角色的距離太貼近我了。",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 3,
      id: 12,
      question: "我覺得這個 AI 角色與我之間缺乏安全的互動距離。",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 4,
      id: 13,
      question: "這位 AI 給人一種主導性的印象。",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 4,
      id: 14,
      question: "這位 AI 看起來掌握了主要發言權。",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 4,
      id: 15,
      question: "這位 AI 表現出較強的控制力。",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 4,
      id: 16,
      question: "這位 AI 整體形象看起來具有影響力。",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 4,
      id: 17,
      question: "您是否願意提供您的學號供此 AI 查詢您的個人資訊？",
      type: "radio",
      options: ['是', '否']
    },
    {
      section: 5,
      id: 18,
      question: "您出生為西元?",
      type: "number"
    },
    {
      section: 5,
      id: 19,
      question: "您的性別為?",
      type: "radio",
      options: ['生理男', '生理女']
    },
    {
      section: 5,
      id: 20,
      question: "您的教育背景為?",
      type: "radio",
      options: ['社會科學院', '文/法學院', '商管學院', '理工學院', '海學院', '藝術/音樂學院', '醫(護)學院', '其他']
    },
    {
      section: 5,
      id: 21,
      question: "您的最高學歷為?",
      type: "radio",
      options: ['國中小', '高中', '大專院校', '碩博士']
    },
    {
      section: 5,
      id: 22,
      question: "您的工作產業為?",
      type: "checkbox",
      options: ['軍警', '公務人員', '教育', '商', '工', '農', '醫療', '服務業', '家管', '學生', '退休', '資訊業', '其他']
    }
  ], [randomValue]); // 加入 randomValue 作為依賴

  // 4. 計算實際問題數量
  const totalQuestions = useMemo(() => {
    return questions.filter(q => q.type !== "video" && q.section !== 0).length;
  }, [questions]); // 加入 questions 作為依賴

  // 5. 其他函數和邏輯
  const generateRandomValue = () => {
    const random = Math.floor(Math.random() * 4) + 1; // 1-4 的隨機數
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

    // 加入 randomValue 到答案中
    const submissionData = {
      ...answers,
      randomValue: randomValue,
      videoType: randomValue <= 2 ? 'video1' : 'video2',
      videoSize: randomValue % 2 === 1 ? '100%' : '50%'
    };

    fetch('https://script.google.com/macros/s/AKfycbxGo5MlaB_0xH_eE58zMSiPH7ZO70Q9faaRAHDtL1kdPK1992PRD7DdsbWTlCVQuBM/exec', {
      method: 'POST',
      body: JSON.stringify(submissionData)
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
    if (currentPage === 0) {
      setCurrentPage(page);
      return;
    }
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
    // 如果是第一頁（currentPage === 0），只顯示影片
    if (currentPage === 0) return question.section === 0;
    // 其他頁面正常過濾
    return question.section === currentPage;
  });
  
  // 定義量表選項的樣式
  const scaleOptions = ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意'];
  const scaleStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    padding: '0 20px'
  };
  const scaleStepStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '5px'
  };
  const stepStyle = {
    width: '20px',
    height: '20px',
    backgroundColor: '#007bff',
    borderRadius: '50%',
    margin: '0 5px'
  };

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
                    playsInline
                    onEnded={handleVideoEnded}
                    src={questions[0].videoSrc}
                    style={{ display: 'block', margin: '0 auto' }}
                    controlsList="nodownload"
                    controls={false}
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