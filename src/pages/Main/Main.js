// src/pages/LoginPage.jsx
// import React from 'react';
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './Main.css';
const Main = () => {
  return (
    <div class="banner-container">
        {/* <h1 class="text-banner">스마트한 K-뷰티 트렌드 분석</h1> */}
        <h1 class="text-banner"><span>K-뷰티의 트렌드, 아이디어</span>🌀</h1>
        {/* <h1 class="text-banner">스마트 K-뷰티 분석</h1> */}
        {/* &👉🛜↔️🔀🔁  */}
        {/* 💡🔦📡🖥️🔎🌀⁉️📈 */}
        
        <div class="banner-section">
            <div class="feature-grid">
                <div class="feature-item">
                    <div class="feature-number">10K+</div>
                    <div class="feature-text">제품 분석</div>
                </div>
                <div class="feature-item">
                    <div class="feature-number">900+</div>
                    <div class="feature-text">카테고리</div>
                </div>
                <div class="feature-item">
                    <div class="feature-number">1K+</div>
                    <div class="feature-text">성분 데이터</div>
                </div>
                <div class="feature-item">
                    <div class="feature-number">24/10</div>
                    <div class="feature-text">실시간 업데이트</div>
                </div>
            </div>

            <div class="info-cards">
                <div class="info-card">
                    <div class="info-icon">🔍</div>
                    <h3>스마트 필터링</h3>
                    <p>정교한 특성 기반 제품 분류 시스템</p>
                </div>
                <div class="info-card">
                    <div class="info-icon">📊</div>
                    <h3>시장 반응 분석</h3>
                    <p>통합적인 소비자 데이터 분석</p>
                </div>
                <div class="info-card">
                    <div class="info-icon">💡</div>
                    <h3>비지니스 인사이트</h3>
                    <p>제품별 상세 성공 요인 분석</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Main;


{/* <div className="main-banner"><h2>메인 배너</h2></div>
<div style={{width:'233px',height:'350px',margin:'70px 100px 0 0', border: '2px solid #383839',display:'inline-block',}}></div>
<div style={{width:'233px',height:'350px',margin:'70px 100px 0 0', border: '2px solid #383839',display:'inline-block'}}></div>
<div style={{width:'233px',height:'350px',margin:'70px 100px 0 0', border: '2px solid #383839',display:'inline-block'}}></div>
<div style={{width:'233px',height:'350px',margin:'70px 0 0 0', border: '2px solid #383839',display:'inline-block'}}></div>
<div style={{width:'100%',height:'400px', border: '2px solid #383839',marginTop:'100px'}}>
  <img style={{width:'300px',height:'300px', border: '2px solid #383839', display: 'flex',justifyContent: 'left', margin:'40px 40px 40px 40px '}}></img>
</div> */}