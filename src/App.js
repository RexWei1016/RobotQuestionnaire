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
  const [screenInfo, setScreenInfo] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth <= 1024, // 修改為 1024px，包含 iPad
    deviceType: window.innerWidth <= 768 ? 'mobile' : 'tablet' // 新增裝置類型判斷
  });

  // 2. 定義常數
  const totalSections = 7; // 更新為 7 個區塊：影片展示 + 6 個問題區塊

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
      question: "請問你剛才與哪一個性別的AI客服互動",
      type: "radio",
      options: ['男性', '女性']
    },
    {
      section: 1,
      id: 2,
      question: "我感覺這個AI角色貼得我有點太近了",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 1,
      id: 3,
      question: "這位 AI 客服給人的感覺是比較有主導性的 ",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 2,
      id: 4,
      question: "這位AI客服讓我感到有些壓迫感",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 2,
      id: 5,
      question: "這位 AI 客服的行為方式讓我感到有些不舒服",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 2,
      id: 6,
      question: "這位 AI 客服的外貌或語氣讓我感到有些不安",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 2,
      id: 7,
      question: "這位 AI 客服表現出來的風格與我對客服角色的印象不太一致",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 2,
      id: 8,
      question: "我會想避免與這樣的 AI 客服進一步互動",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 3,
      id: 9,
      question: "我認為這個AI客服是值得信任的",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 3,
      id: 10,
      question: "我相信這個AI客服提供的資訊是正確的",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 3,
      id: 11,
      question: "如果這個AI提供建議給我，我會願意參考",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 3,
      id: 12,
      question: "整體而言，我感覺這個AI客服是可靠的",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 4,
      id: 13,
      question: "這個AI客服讓我感覺它「離我非常近」",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 4,
      id: 14,
      question: "它出現在畫面上的方式讓我感覺它幾乎「 入侵」我的整個畫面",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 4,
      id: 15,
      question: "這個 AI 客服在畫面中的呈現方式讓我覺得它距離太貼近我了",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 4,
      id: 16,
      question: "我覺得這個 AI 客服與我之間缺乏令人安心的互動距離",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 5,
      id: 17,
      question: "這位 AI 給人一種主導性的印象",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 5,
      id: 18,
      question: "這位 AI 看起來掌握了主要發言權",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 5,
      id: 19,
      question: "這位 AI 表現出較強的控制力",
      type: "radio",
      options: ['非常同意', '同意', '略同意', '普通', '略不同意', '不同意', '非常不同意']
    },
    {
      section: 5, 
      id: 20,
      question: "這位 AI 整體形象看起來具有影響力",
      type: "radio",
      options: ['是', '否']
    },
    {
      section: 6,
      id: 21,
      question: "您出生為西元?",
      type: "number"
    },
    {
      section: 6,
      id: 22,
      question: "您的性別為?",
      type: "radio",
      options: ['生理男', '生理女']
    },
    {
      section: 6,
      id: 23,
      question: "您的教育背景為?",
      type: "radio",
      options: ['社會科學院', '文/法學院', '商管學院', '理工學院', '海學院', '藝術/音樂學院', '醫(護)學院', '其他']
    },
    {
      section: 6,
      id: 24,
      question: "您的最高學歷為?",
      type: "radio",
      options: ['國中小', '高中', '大專院校', '碩博士']
    },
    {
      section: 6,
      id: 25,
      question: "您的工作產業為?",
      type: "checkbox",
      options: ['軍警', '公務人員', '教育', '商', '工', '農', '醫療', '服務業', '家管', '學生', '退休', '資訊業', '其他']
    },
    {
      section: 6,
      id: 26,
      question: "您是否要參加抽獎活動？",
      type: "radio",
      options: ['是', '否']
    },
    {
      section: 6,
      id: 27,
      question: "請留下您的電子郵件（參加抽獎用）",
      type: "email",
      showIf: (answers) => answers[26] === '是'
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
    setAnswers(prevAnswers => {
      const newAnswers = {
        ...prevAnswers,
        [questionId]: answer
      };

      // 如果選擇不參加抽獎（問題 26），自動設置 email（問題 27）為 null@email.com
      if (questionId === 26 && answer === '否') {
        newAnswers[27] = 'null@email.com';
      }

      return newAnswers;
    });
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

  // 監聽螢幕尺寸變化
  useEffect(() => {
    const handleResize = () => {
      setScreenInfo({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth <= 1024, // 修改為 1024px
        deviceType: window.innerWidth <= 768 ? 'mobile' : 'tablet' // 新增裝置類型判斷
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

    // 加入 randomValue 和螢幕資訊到答案中
    const submissionData = {
      ...answers,
      randomValue: randomValue,
      videoType: randomValue <= 2 ? 'video1' : 'video2',
      videoSize: randomValue % 2 === 1 ? '100%' : '50%',
      screenInfo: {
        width: screenInfo.width,
        height: screenInfo.height,
        isMobile: screenInfo.isMobile,
        deviceType: screenInfo.deviceType,
        devicePixelRatio: window.devicePixelRatio
      }
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
      
      // 特殊處理抽獎相關問題
      if (question.id === 27) { // email 問題
        // 如果選擇不參加抽獎（id 26 的答案為 '否'），則不需要填寫 email
        return answers[26] === '否' || (value !== undefined && value !== '');
      }
      
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
        {!screenInfo.isMobile ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>請使用手機或平板裝置進行問卷</h2>
            <p>本問卷僅支援手機或平板裝置作答，請使用手機或平板開啟此頁面。</p>
          </div>
        ) : submitted ? (
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
                      showIf={question.showIf}
                      answers={answers}
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