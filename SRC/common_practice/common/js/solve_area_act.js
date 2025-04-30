let selfScore = null;
const checkCountMap = new Map();

const getScale = () => {
  let scaleValue = $('#app_wrap').css('transform');
  if (scaleValue && scaleValue !== 'none') {
    const match = scaleValue.match(/^matrix\(([^,]+)/);
    if (match) {
      scaleValue = parseFloat(match[1]);
    }
  }
  return scaleValue;
};

const activateSolveArea = () => {
  const isPaging = document.querySelector('.contents')?.classList.contains('paging_layout');
<<<<<<< HEAD
=======
  console.log('실행');
>>>>>>> b1dd6843 (초기 커밋)
  if (isPaging) {
    document.querySelector('article.on .solve_area')?.classList.add('active');
  } else {
    document.querySelector('.solve_area')?.classList.add('active');
  }
};

function revealExampleBoxes(container) {
  const examples = container.querySelectorAll('.example_box');
  examples.forEach((box) => {
    box.classList.add('on');
  });
}

const showAllExampleBoxes = () => {
  const page = pagenation?.activePage || document;
  page.querySelectorAll('.example_box').forEach((el) => el.classList.add('on'));
<<<<<<< HEAD
=======
  if ($('.paging_layout').length > 0) {
    $('.page.on .btnSubmit').removeClass('chk').addClass('off');
  } else {
    $('.btnSubmit').removeClass('chk').addClass('off');
  }
>>>>>>> b1dd6843 (초기 커밋)
};

const updateBodyClassByScore = () => {
  const isPaging = document.querySelector('.contents')?.classList.contains('paging_layout');
  const target = isPaging ? document.querySelector('article.on') : document.body;
  const container = isPaging ? document.querySelector('article.on') : document;

  target.classList.remove('success', 'failed', 'failed-all', 'result');

  const activeStars = document.querySelectorAll('.rate-popover .star.active');
  selfScore = activeStars.length;

  const allAnswerable = container.querySelectorAll('[data-answer-single]').length;
  const allCorrected = container.querySelectorAll("[data-correction='true']").length;
  const hasScored = allAnswerable > 0;
  const hasUnscored = container.querySelectorAll('.example_box').length > 0;

  if (!hasScored && hasUnscored) {
    if (selfScore === 3) {
      target.classList.add('success');
    } else if (selfScore === 0) {
      target.classList.add('failed-all');
    } else {
      target.classList.add('failed');
    }
    target.classList.add('result');
    activateSolveArea();
    return;
  }

  if (allAnswerable > 0) {
    if (allCorrected === allAnswerable) {
      target.classList.add('success');
    } else if (allCorrected === 0) {
      target.classList.add('failed-all');
    } else {
      target.classList.add('failed');
    }
  }

  target.classList.add('result');
  activateSolveArea();
};

const handleSelfEvaluation = () => {
  const isPaging = document.querySelector('.contents')?.classList.contains('paging_layout');
  const container = isPaging ? document.querySelector('article.on') : document;

  const hasScored = container.querySelectorAll('[data-answer-single]').length > 0;
  const hasUnscored = container.querySelectorAll('.example_box').length > 0;

  if (hasScored) return;
  if (!hasUnscored) return;

  const btnsSolve = container.querySelector('.buttons_solve');
  const alreadyExists = btnsSolve?.querySelector('.btnSelf');
<<<<<<< HEAD

  if (btnsSolve && !alreadyExists) {
    const btnWrapper = document.createElement('div');
    const btn = document.createElement('button');
=======
  if (btnsSolve && !alreadyExists) {
    const btnWrapper = document.createElement('div');
    const btn = document.createElement('button');
    btnWrapper.className = 'self_wrap';
>>>>>>> b1dd6843 (초기 커밋)
    btn.type = 'button';
    btn.className = 'btnSelf';
    btn.innerHTML = '<span lang="y">평가하기</span>';
    btn.addEventListener('click', showRatingPopup);

    btnWrapper.appendChild(btn);
    btnsSolve.insertBefore(btnWrapper, btnsSolve.firstChild);
<<<<<<< HEAD
=======

    $('.btn_area').addClass('self');
>>>>>>> b1dd6843 (초기 커밋)
  }
};

const showRatingPopup = (event) => {
<<<<<<< HEAD
  if (document.querySelector('.rate-popover')) return;
=======
  if (document.querySelector('.rate-popover')) {
    const popover = document.querySelector('.rate-popover');
    popover.style.display = 'block';
    return;
  }
>>>>>>> b1dd6843 (초기 커밋)

  const popover = document.createElement('div');
  popover.className = 'rate-popover';
  popover.innerHTML = `
    <div class="rate-box">
      <strong class="rate-title">스스로 평가해 보세요.</strong>
      <div class="stars">
        ${[1, 2, 3].map((i) => `<button type="button" class="star" data-score="${i}"></button>`).join('')}
      </div>
      <button type="button" class="close_popup" aria-label="닫기"></button>
    </div>
  `;

  const btn = event.currentTarget;
  const wrapperDiv = btn.parentElement;
  if (wrapperDiv) wrapperDiv.appendChild(popover);

  popover.querySelectorAll('.star').forEach((star, index, stars) => {
    star.addEventListener('click', () => {
      selfScore = index + 1;
      stars.forEach((s) => s.classList.remove('active'));
      for (let i = 0; i <= index; i++) {
        stars[i].classList.add('active');
      }

      const submitBtn = document.querySelector('.btnSubmit');
<<<<<<< HEAD
=======

>>>>>>> b1dd6843 (초기 커밋)
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.add('active');
        submitBtn.classList.remove('close');
<<<<<<< HEAD
=======
        if ($('.paging_layout').length > 0) {
          $('.page.on .btnSubmit').removeClass('off');
        } else {
          $('.btnSubmit').removeClass('off');
        }
>>>>>>> b1dd6843 (초기 커밋)
      }
    });
  });

  const closeBtn = popover.querySelector('.close_popup');
  closeBtn.addEventListener('click', () => {
<<<<<<< HEAD
    popover.remove();
=======
    popover.style.display = 'none';
>>>>>>> b1dd6843 (초기 커밋)
  });
};

const observeHintAdded = () => {
  const mathFields = document.querySelectorAll('math-field');
  mathFields.forEach((el) => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class' && el.classList.contains('hint')) {
<<<<<<< HEAD
          activateSolveArea();
=======
          /** 250429 김용현 - 조건이 맞지 않아 주석처리 */
          /** 해당 함수 활성화시 EMA514_04_IH_0002_s 문제 오류 발생 */
          // activateSolveArea();
>>>>>>> b1dd6843 (초기 커밋)
        }
      });
    });
    observer.observe(el, {
      attributes: true,
      attributeFilter: ['class'],
    });
  });
};

const resetSolveArea = () => {
  document.body.classList.remove('success', 'failed', 'failed-all', 'result');
  document.querySelectorAll('article').forEach((article) => {
    article.classList.remove('success', 'failed', 'failed-all', 'result');
  });
  document.querySelectorAll('.solve_area').forEach((el) => el.classList.remove('active'));
  document.querySelector('.rate-popover')?.remove();
<<<<<<< HEAD
  document.querySelector('.btnSelf')?.remove();
  selfScore = null;
  checkCountMap.clear();
=======
  document.querySelector('.self_wrap')?.remove();
  selfScore = null;
  checkCountMap.clear();

  if ($('.paging_layout').length > 0) {
    $('.page.on .btnSubmit').removeClass('off');
  } else {
    $('.btnSubmit').removeClass('off');
  }
  if ($('.btn_area').hasClass('self')) {
    $('.btnSubmit').removeClass('active').addClass('chk');
  }
>>>>>>> b1dd6843 (초기 커밋)
};

// 기억에 남는 내용 버튼 수정
function reviewBoxBtn() {
  const mathField = document.querySelector('.review_box math-field.textarea');
  const submitBtn = document.querySelector('.btnSubmit');

  mathField.addEventListener('input', () => {
    const value = mathField.value.trim();
    if (value) {
      submitBtn.classList.add('active');
    } else {
      submitBtn.classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const btnCheck = document.querySelector('.btnCheck');
  const btnSubmit = document.querySelector('.btnSubmit');
  const btnReset = document.querySelector('.btnReset');

  if (btnCheck) {
    btnCheck.addEventListener('click', () => {
      if (btnCheck.classList.contains('close')) {
        resetSolveArea();
        return;
      }
<<<<<<< HEAD
    
      const isPaging = document.querySelector('.contents')?.classList.contains('paging_layout');
      const container = isPaging ? document.querySelector('article.on') : document;
      const key = isPaging ? container : 'global';
    
      const answerables = [...container.querySelectorAll('[data-answer-single]')];
      const hasScored = answerables.length > 0;
    
=======

      const isPaging = document.querySelector('.contents')?.classList.contains('paging_layout');
      const container = isPaging ? document.querySelector('article.on') : document;
      const key = isPaging ? container : 'global';

      const answerables = [...container.querySelectorAll('[data-answer-single]')];
      const hasScored = answerables.length > 0;

>>>>>>> b1dd6843 (초기 커밋)
      const hasEmpty = answerables.some((el) => {
        const val = el.value || el.dataset?.value;
        return !el.dataset.correction && (!val || val.trim?.() === '');
      });
<<<<<<< HEAD
    
=======

>>>>>>> b1dd6843 (초기 커밋)
      if (hasEmpty) {
        checkCountMap.set(key, 0);
        if (typeof toastCheckMsg === 'function') {
          toastCheckMsg('문제를 풀어보세요!', 1, false);
        }
        return;
      }
<<<<<<< HEAD
    
      if (hasScored) {
        const allCorrected = container.querySelectorAll("[data-correction='true']").length;
    
=======

      if (hasScored) {
        const allCorrected = container.querySelectorAll("[data-correction='true']").length;

>>>>>>> b1dd6843 (초기 커밋)
        if (allCorrected === answerables.length) {
          updateBodyClassByScore();
          showAllExampleBoxes();
          return;
        }
<<<<<<< HEAD
    
        const currentCount = checkCountMap.get(key) || 0;
        const newCount = currentCount + 1;
        checkCountMap.set(key, newCount);
    
=======

        const currentCount = checkCountMap.get(key) || 0;
        const newCount = currentCount + 1;
        checkCountMap.set(key, newCount);

>>>>>>> b1dd6843 (초기 커밋)
        if (newCount >= 2) {
          updateBodyClassByScore();
          showAllExampleBoxes();
        } else {
          observeHintAdded();
        }
<<<<<<< HEAD
    
        return;
      }
    
      // 자가 평가 문제의 경우
      handleSelfEvaluation();
      showAllExampleBoxes();
    
=======

        return;
      }

      // 자가 평가 문제의 경우
      handleSelfEvaluation();
      showAllExampleBoxes();

>>>>>>> b1dd6843 (초기 커밋)
      if (typeof toastCheckMsg === 'function') {
        toastCheckMsg('선생님께 제출되었습니다.', 5, false);
      }
    });
<<<<<<< HEAD
    
  }
  
  
=======
  }

>>>>>>> b1dd6843 (초기 커밋)
  if (btnSubmit) {
    btnSubmit.addEventListener('click', () => {
      const isPaging = document.querySelector('.contents')?.classList.contains('paging_layout');
      const container = isPaging ? document.querySelector('article.on') : document;
<<<<<<< HEAD
  
=======

>>>>>>> b1dd6843 (초기 커밋)
      const answerables = [...container.querySelectorAll('[data-answer-single]')];
      const hasScored = answerables.length > 0;
      const hasEmpty = answerables.some((el) => {
        const val = el.value || el.dataset?.value;
        return !el.dataset.correction && (!val || val.trim?.() === '');
      });
<<<<<<< HEAD
  
=======

>>>>>>> b1dd6843 (초기 커밋)
      if (hasEmpty) {
        if (typeof toastCheckMsg === 'function') {
          toastCheckMsg('문제를 풀어보세요!', 1, false);
        }
        return; // solve_area 활성화 없이 종료
      }
<<<<<<< HEAD
  
      const hasUnscored = container.querySelectorAll('.example_box').length > 0;
  
      if (!hasScored && hasUnscored && selfScore === null) {
        showAllExampleBoxes();
        revealExampleBoxes(container);
        handleSelfEvaluation(); // 자가 평가 노출
        return;
      }
  
=======

      const hasUnscored = container.querySelectorAll('.example_box').length > 0;
      if (!hasScored && hasUnscored && selfScore === null) {
        $('.btnSubmit.chk').removeClass('active');
        console.log('d');
        showAllExampleBoxes();
        revealExampleBoxes(container);
        handleSelfEvaluation(); // 자가 평가 노출

        return;
      }

>>>>>>> b1dd6843 (초기 커밋)
      // 채점 진행
      updateBodyClassByScore(); // 이 안에서 solve_area 활성화됨
      showAllExampleBoxes();
      revealExampleBoxes(container);
<<<<<<< HEAD
  
=======

>>>>>>> b1dd6843 (초기 커밋)
      if (typeof toastCheckMsg === 'function') {
        toastCheckMsg('선생님께 제출되었습니다.', 5, false);
      }
    });
  }
<<<<<<< HEAD
  
=======

>>>>>>> b1dd6843 (초기 커밋)
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      resetSolveArea();
    });
  }

  document.body.addEventListener('click', (e) => {
    const submitBtn = e.target.closest('.toast_box_wrap .submit');
    if (submitBtn) {
      updateBodyClassByScore();
    }
  });

<<<<<<< HEAD
  if ($('.review_box').length > 0) {
=======
  if (document.querySelectorAll('.review_box').length > 0) {
>>>>>>> b1dd6843 (초기 커밋)
    reviewBoxBtn();
  }
});
