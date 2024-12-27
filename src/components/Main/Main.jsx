import React, { useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Main = () => {
  const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context)
  return (
    <div className='main'>
        <div className="nav">
          <img className='logo-ai' src={assets.ai_icon} alt="" />
          <img className='avatar' src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">
          {!showResult
          ?<>
            <div className="greet">
            <p><span>Hello,</span></p>
            <p>how I can help you today?</p>
          </div>
          <div className="cards">
            <div className="card">
              <p>What is XBRL, and how does it enhance sustainability reporting processes?</p>
              <img src={assets.bulb_icon} alt="" />
            </div>
            <div className="card">
              <p>What are some of the key benefits of using XBRL?</p>
              <img src={assets.star_icon} alt="" />
            </div>
            <div className="card">
              <p>What challenges might organizations face when implementing XBRL?</p>
              <img src={assets.puzzle_icon} alt="" />
            </div>
            <div className="card">
              <p>What tools and software are commonly used to create and analyze XBRL reports?</p>
              <img src={assets.code_icon} alt="" />
            </div>
          </div>
          </>
          :<div className='result'>
            <div className='result-title'>
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className='result-data'>
              <img src={assets.ai_icon} alt="" />
              {loading
              ? <div className='loader'>
                 <hr />
                 <hr />
                 <hr />
                </div>
              : <p dangerouslySetInnerHTML={{__html:resultData}}></p>
              }
            </div>
          </div>
          }
          <div className="main-bottom">
            <div className="search-box">
              <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
              <div>
                <img src={assets.add_image_icon} alt="" />
                <img src={assets.mic_icon} alt="" />
                <img onClick={()=>onSent()} src={assets.send_icon} alt="" />
              </div>
            </div>
            <p className="bottom-info">
              The output may display inaccurate info, including about people, so double-check its responses.
            </p>
          </div>
        </div>
    </div>
  )
}

export default Main