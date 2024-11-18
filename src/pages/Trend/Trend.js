import React, { useState, useEffect } from 'react';
import categories from '../../data.js';
import './Trend.css';



const INITIAL_STEP = 0;
const TOTAL_STEPS = 4;
const INITIAL_OPTIONS = Object.fromEntries([...Array(TOTAL_STEPS)].map((_, i) => [i, '']));

const Trend = () => {
    const [currentCategory, setCurrentCategory] = useState(null);
    const [visibleSteps, setVisibleSteps] = useState([INITIAL_STEP]);
    const [selectedOptions, setSelectedOptions] = useState(INITIAL_OPTIONS);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [selectedQuestionIds, setSelectedQuestionIds] = useState({});

    const resetSelections = () => {
        setVisibleSteps([INITIAL_STEP]);
        setSelectedOptions(INITIAL_OPTIONS);
        setSelectedQuestion(null);
        setActiveDropdown(null);
        setSelectedQuestionIds({});
    };

    const handleCategoryClick = (category) => {
        setCurrentCategory(category);
        resetSelections();
    };

    const handleDropdownClick = (step) => {
        setActiveDropdown(activeDropdown === step ? null : step);
        setSelectedQuestion(null);
    };

    const handleQuestionSelect = (question, step) => {
        setSelectedQuestion({ ...question, step });
    };

    const handleOptionSelect = (step, optionText, questionId) => {
        setSelectedOptions(prev => ({ ...prev, [step]: optionText }));
        setSelectedQuestionIds(prev => ({ ...prev, [step]: questionId }));
        setSelectedQuestion(null);
        setActiveDropdown(null);

        if (step < TOTAL_STEPS - 1) {
            setVisibleSteps(prev => [...new Set([...prev, step + 1])]);
        }
    };

    const handleApply = () => {
        // 적용하기 로직 구현
        console.log('Selected Options:', selectedOptions);
        console.log('Selected Question IDs:', selectedQuestionIds);
        // API 호출이나 다른 처리를 여기에 추가
    };

    const getAvailableQuestions = (step) => {
        if (!currentCategory) return [];
        
        const selectedIds = Object.values(selectedQuestionIds);
        return currentCategory.questions.filter(question => {
            if (selectedQuestionIds[step] === question.question_id) return true;
            return !selectedIds.includes(question.question_id);
        });
    };

    const getQuestionOptions = (questionId) => {
        if (!currentCategory || !questionId) return [];
        
        const question = categories
            .find(cat => cat.category_id === currentCategory.category_id)
            ?.questions.find(q => q.question_id === questionId);
            
        return question?.options || [];
    };

    const getSelectedQuestionText = (step) => {
        if (!currentCategory || !selectedQuestionIds[step]) return '';
        
        const question = currentCategory.questions.find(
            q => q.question_id === selectedQuestionIds[step]
        );
        return question?.question_text || '';
    };

    const renderDropdownOptions = (step) => (
        <div className="options-popup">
            {getAvailableQuestions(step).map(question => (
                <div
                    key={question.question_id}
                    className={`option-item ${
                        selectedQuestion?.question_id === question.question_id ? 'active' : ''
                    }`}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleQuestionSelect(question, step);
                    }}
                >
                    {question.question_text}
                    
                    {selectedQuestion?.question_id === question.question_id && (
                        <div className="sub-options-popup">
                            {getQuestionOptions(question.question_id).map(option => (
                                <div
                                    key={option.option_number}
                                    className={`option-item ${
                                        selectedOptions[step] === option.option_text ? 'selected' : ''
                                    }`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleOptionSelect(step, option.option_text, question.question_id);
                                    }}
                                >
                                    {option.option_text}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.select-container')) {
                setActiveDropdown(null);
                setSelectedQuestion(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <section className="category-section">
            <div className="parent-categories">
                {categories.map(category => (
                    <div
                        key={category.category_id}
                        className={`parent-category ${
                            currentCategory?.category_id === category.category_id ? 'active' : ''
                        }`}
                        onClick={() => handleCategoryClick(category)}
                    >
                        <div className="category-name">{category.category_name}</div>
                    </div>
                ))}
            </div>

            <div className={`sub-options ${currentCategory ? 'active' : ''}`}>
                <div className="options-flow">
                    {[...Array(TOTAL_STEPS)].map((_, step) => (
                        <div
                            key={step}
                            className={`option-wrapper ${visibleSteps.includes(step) ? 'visible' : ''}`}
                        >
                            <div className="select-container">
                                <div 
                                    className="option-select-button"
                                    onClick={() => handleDropdownClick(step)}
                                >
                                    {selectedOptions[step] ? (
                                        <div className="selected-content-stacked">
                                            <div className="question-label">
                                                {getSelectedQuestionText(step)}
                                            </div>
                                            <div className="option-value">
                                                {selectedOptions[step]}
                                            </div>
                                        </div>
                                    ) : (
                                        `${step + 1}단계 선택`
                                    )}
                                    <span className="dropdown-arrow" />
                                </div>
                                {activeDropdown === step && renderDropdownOptions(step)}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="action-buttons">
                    <button
                        className="apply-button"
                        onClick={handleApply}
                        disabled={!Object.values(selectedOptions).some(Boolean)}
                    >
                        적용하기
                    </button>
                    <button
                        className="reset-button"
                        onClick={resetSelections}
                        disabled={!Object.values(selectedOptions).some(Boolean)}
                    >
                        초기화
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Trend;