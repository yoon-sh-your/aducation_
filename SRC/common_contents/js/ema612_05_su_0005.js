
document.addEventListener("DOMContentLoaded", () => {
<<<<<<< HEAD
    const trigger = document.querySelector('.custom_select .select_trigger');
    const select = document.querySelector('.dropdown_wrap .custom_dropdown');

    const canvas = document.querySelector('.line_canvas');
    const answerData = canvas.dataset.answerSingle;

    let selectedLine = null;

    function answerMatchClassName(target, answers) {
        const lines = target.querySelectorAll("line, path");
        if (lines.length !== anssers.length) return false;
        if (answers.length === 0) return false;

        const answerData = JSON.parse(answers);
        const ansser = answerData.map((item, index) => {
            const lineClasses = Array.from(lines[index].classList);
            return lineClasses.includes(item);
        });

        return ansser.every((item) => item === true);


        // 정답과 비교
        // return Array.from(lines).every((line, index) => {
        //     const lineClasses = Array.from(line.classList);
        //     return lineClasses.includes(anssers[index]);
        // });
    }

    function checkAnswer() {
        const svg = document.querySelector("svg");
        if (!svg) return false;

        const lines = svg.querySelectorAll("line, path");
        if (lines.length === 0) return false;

        const answers = answerData.map((item) => item.className);
        const result = answerMatchClassName(svg, answers);

        return result;
    }
    // 정답과 비교
    // return Array.from(lines).every((line, index) => {
    //     const lineClasses = Array.from(line.classList);
    //     return lineClasses.includes(answers[index]);
    // });
    // const answers = [
    //     "guide-dash",
    //     "guide-dash",
    //     "guide-dash",
    //     "guide-dash",
    //     "guide-solid",
    //     "guide-solid",
    //     "guide-solid",
    //     "guide-solid",
    //     "guide-solid",
    //     "red-solid",     
    //     "red-solid",
    //     "red-solid",
    //     "red-solid",
    //     "red-solid",
    // ];
    // const result = answerMatchClassName(svg, answers);
    // console.log(result);

    // show select line type
    function displaySelectLineType() {
        const selectedLine = document.querySelector('.line_canvas line.selected');
        if (selectedLine) {
            if (selectedLine.classList.contains('guide-dash')) select.value = 'dotted';
            else if (selectedLine.classList.contains('guide-solid')) select.value = 'solid';
            else select.value = '';
        } else {
            select.value = '';
        }
        select.dispatchEvent(new Event('change', { bubbles: true }));
    }

    document.querySelector('.line_canvas').addEventListener('click', (e) => {
        if (!(e.target instanceof SVGLineElement)) return;

        document.querySelectorAll('.line_canvas line.selected').forEach(line => {
            line.classList.remove('selected');
        });

        e.target.classList.add('selected');
        selectedLine = e.target;

        if (selectedLine.classList.contains('guide-dash')) select.value = 'dotted';
        else if (selectedLine.classList.contains('guide-solid')) select.value = 'solid';
        else select.value = '';

        select.dispatchEvent(new Event('change', { bubbles: true }));
        handleSelectOption(select, trigger, select.querySelector('.options_list'), { value: select.value });
    });

    select.addEventListener('change', function () {
        if (!selectedLine) return;
        selectedLine.classList.remove('guide-dash', 'guide-solid');
        if (this.value === 'solid') selectedLine.classList.add('guide-solid');
        else if (this.value === 'dotted') selectedLine.classList.add('guide-dash');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.line_canvas') && !e.target.closest('.dropdown_wrap')) {
            document.querySelectorAll('.line_canvas line.selected').forEach(line => {
                line.classList.remove('selected');
            });
            selectedLine = null;
            select.value = '';
            select.dispatchEvent(new Event('change', { bubbles: true }));
        }
    });

    // svg 직접 그리시 시에
    const svg = document.querySelector("svg");

    // SVG 내 모든 line, path에 클릭 이벤트
    svg.querySelectorAll('line, path').forEach(svgElem => {
        svgElem.addEventListener('click', function () {
            const value = select.value;

            // 기존 스타일 클래스 제거
            this.classList.remove('guide-solid', 'guide-dash', 'red-solid');

            // 선택값 적용
            if (value === 'solid') this.classList.add('guide-solid');
            else if (value === 'dotted') this.classList.add('guide-dash');
            // 빈 값이면 아무 class 없음(초기화)
        });
    });
});

runAfterAppReady(() => {
    window.customCheckCondition = () => {
        const svg = document.querySelector("svg");
        if (!svg) return false;
        const lines = svg.querySelectorAll("line, path");

        const answers = [
            "guide-dash",
            "guide-dash",
            "guide-dash",
            "guide-dash",
            "guide-solid",
            "guide-solid",
            "guide-solid",
            "guide-solid",
            "guide-solid",
            "red-solid",
            "red-solid",
            "red-solid",
            "red-solid",
            "red-solid",
        ];

        // 정답과 비교
        return Array.from(lines).every((line, index) => {
            const lineClasses = Array.from(line.classList);
            return lineClasses.includes(answers[index]);
        });

        // 정답과 비교
        // return Array.from(lines).every((line, index) => {
        //     const lineClasses = Array.from(line.classList);
        //     return lineClasses.includes("guide-dash") || lineClasses.includes("guide-solid");
        // });
    }

    defineButtonClassRules([
        // {
        //     selector: ".grid-canvas .userLines",
        //     key: "custom_submit_btn_active",
        //     test: (el) => {
        //         const lines = el.querySelectorAll("line");
        //         return lines.length > 0 && Array.from(lines).some((line) => {
        //             const x1 = parseFloat(line.getAttribute("x1"));
        //             const y1 = parseFloat(line.getAttribute("y1"));
        //             const x2 = parseFloat(line.getAttribute("x2"));
        //             const y2 = parseFloat(line.getAttribute("y2"));

        //             return x1 !== x2 || y1 !== y2;
        //         }
        //         );
        //     }
        // },
=======
    const wrapper = document.querySelector("#app_wrap");
    const currentPageId = wrapper?.getAttribute("data-current-page");
    // if (currentPageId !== "page_1" && currentPageId !== "page_2") return;

    const currentPage = document.querySelector(`.page.${currentPageId}`);
    if (!currentPage) return;

    const getScale = () => {
        const appWrap = document.getElementById("app_wrap");
        const transform = window.getComputedStyle(appWrap).transform;
        if (transform && transform !== "none") {
            const match = transform.match(/^matrix\(([^,]+)/);
            if (match) {
                return parseFloat(match[1]);
            }
        }
        return 1;
    }

    function svgXYToClient(svg, x, y) {
        const point = svg.createSVGPoint();
        point.x = x;
        point.y = y;

        // SVG 좌표를 화면 좌표로 변환
        const screenPoint = point.matrixTransform(svg.getScreenCTM());
        const svgRect = svg.getBoundingClientRect();

        let scale = getScale();
        console.log("scale", scale);
        /* 모눈에 드롭메뉴를 띄우는건 viewport 가 아니라 모눈의 격자에 드룹메뉴를 띄우므로 line 생성시 viewport 와 관련 없음. */

        const adjustedX = (screenPoint.x - svgRect.left) / scale;
        const adjustedY = (screenPoint.y - svgRect.top) / scale;

        return { clientX: adjustedX, clientY: adjustedY };
    }

    function showDropdownAtPoint(x, y) {
        if (!selctLineType) return;

        isDropdownManuallyOpened = true;

        selctLineType.style.display = "block";
        selctLineType.style.zIndex = 1000;

        const dropdownRect = selctLineType.getBoundingClientRect();
        const dropdownWidth = dropdownRect.width;
        const dropdownHeight = dropdownRect.height;

        let left = x;
        let top = y + 10;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if (left + dropdownWidth > viewportWidth) {
            left = viewportWidth - dropdownWidth - 10;
        }
        if (top + dropdownHeight > viewportHeight) {
            top = viewportHeight - dropdownHeight - 10;
        }

        selctLineType.style.left = `${Math.round(left)}px`;
        selctLineType.style.top = `${Math.round(top)}px`;
    }

    function hideDropdown() {
        if (!selctLineType) return;
        if (!isDropdownManuallyOpened) {
            canvas.querySelectorAll("line.selected, path.selected").forEach((l) =>
                l.classList.remove("selected")
            );
            lastCreatedLine = null;

            if (selctLineType.style.display === "block") {
                selctLineType.style.display = "none";
            }
        }
        isDropdownManuallyOpened = false;
    }

    const canvas = currentPage.querySelector(".line_canvas");
    const selctLineType = currentPage.querySelector(".select_line_type");

    // canvasGroups.forEach((canvas, index) => {
    // const canvas = currentPage.querySelector(`.line_canvas`);
    // const selctLineType = currentPage.querySelector('.select_line_type');
    const optionsList = selctLineType ? selctLineType.querySelector('.select_type_options') : null;
    let lastCreatedLine = null;
    let isDropdownManuallyOpened = false;

    if (optionsList) {
        optionsList.querySelectorAll('li').forEach(li => {
            li.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!lastCreatedLine) return;
                lastCreatedLine.classList.remove('guide-solid', 'guide-dash');
                if (li.dataset.value === 'solid') lastCreatedLine.classList.add('guide-solid');
                else if (li.dataset.value === 'dotted') lastCreatedLine.classList.add('guide-dash');
                selctLineType.style.display = "none";
            });
        });
    } else {
        console.error('optionsList (.select_type_options) 요소를 찾을 수 없습니다!');
    }

    // svg line 생성시
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1 && node.tagName === 'line') {
                    lastCreatedLine = node;
                    canvas.querySelectorAll('line.selected').forEach(l => l.classList.remove('selected'));
                    node.classList.add('selected');

                    // 라인 끝점 좌표 가져오기
                    const x2 = Number(node.getAttribute('x2'));
                    const y2 = Number(node.getAttribute('y2'));

                    const { clientX, clientY } = svgXYToClient(canvas, x2, y2);
                    showDropdownAtPoint(clientX, clientY);
                }
            });
        });
    });
    observer.observe(canvas, { childList: true });
    // });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.line_canvas') && !e.target.closest('.select_line_type')) {
            hideDropdown();
        }
    });
});

runAfterAppReady(() => {
    function getCurrentPage() {
        const appWrap = document.getElementById('app_wrap');
        return appWrap.getAttribute('data-current-page');
    }

    function normalizeCoordinates(answerData) {
        // 좌표를 기준점(예: 가장 작은 x, y 값)으로 정규화
        const minX = Math.min(...answerData.map(point => point.x));
        const minY = Math.min(...answerData.map(point => point.y));

        return answerData.map(point => ({
            x: point.x - minX,
            y: point.y - minY,
            className: point.className || ""
        }));
    }

    function answerMatch(answerData, lines) {
        if (lines.length !== answerData.length) return false;

        // 정답 데이터
        const normalizedAnswerData = normalizeCoordinates(answerData)
            .map(answer => `${answer.x},${answer.y},${answer.className}`)
            .sort()
            .join("|");

        // lines 데이터 정규화
        const normalizedLineData = Array.from(lines)
            .map(line => {
                const x1 = parseFloat(line.getAttribute("x1"));
                const y1 = parseFloat(line.getAttribute("y1"));
                const x2 = parseFloat(line.getAttribute("x2"));
                const y2 = parseFloat(line.getAttribute("y2"));
                const className = line.getAttribute("class") || "";

                // 두 좌표 중 하나라도 정답과 일치하면 포함
                return [
                    `${x1},${y1},${className}`,
                    `${x2},${y2},${className}`
                ];
            })
            .flat()
            .sort()
            .join("|");

        // 정렬된 문자열 비교
        return normalizedAnswerData === normalizedLineData;
    }

    function compareCoordinates(data1, data2) {
        if (data1.length !== data2.length) return false;

        const normalizedData1 = normalizeCoordinates(data1)
            .map(point => `${point.x},${point.y}`)
            .sort()
            .join("|");

        const normalizedData2 = normalizeCoordinates(data2)
            .map(point => `${point.x},${point.y}`)
            .sort()
            .join("|");

        return normalizedData1 === normalizedData2;
    }

    function checkAnswer(connectionData, answerSingle, additionalAnswers) {
        // 기본 정답 비교
        const isAnswerMatch = compareCoordinates(connectionData, answerSingle);

        // 추가 정답 비교
        const isAdditionalMatch = additionalAnswers.some(answer =>
            compareCoordinates(connectionData, answer)
        );

        return isAnswerMatch || isAdditionalMatch;
    }

    window.customCheckCondition = () => {
        const currentPage = getCurrentPage();
        if (currentPage !== 'page_1' || currentPage !== 'page_2') return false;

        const svg = document.querySelector(".line_canvas");
        if (!svg) return false;

        const lines = svg.querySelectorAll("line");

        const answerData1 = [
            { x: 60, y: 120 },
            { x: 60, y: 270 },
            { x: 150, y: 270, className: "guide-dash" },
            { x: 150, y: 360 },
            { x: 270, y: 270 },
            { x: 390, y: 270 },
            { x: 390, y: 120 },
            { x: 270, y: 120, className: "guide-dash" },
            { x: 150, y: 30 },
            { x: 150, y: 120, className: "guide-dash" },
            { x: 150, y: 270, className: "guide-dash" },
        ];

        const answerData2 = [
            { "x": 60, "y": 120 },
            { "x": 60, "y": 270 },
            { "x": 150, "y": 270 },
            { "x": 150, "y": 360 },
            { "x": 270, "y": 270 },
            { "x": 390, "y": 270 },
            { "x": 390, "y": 120 },
            { "x": 270, "y": 120 },
            { "x": 150, "y": 30 },
            { "x": 150, "y": 120 },
            { "x": 150, "y": 120 },
            { "x": 150, "y": 270 },
            { "x": 270, "y": 270 },
            { "x": 270, "y": 120 },
            { "x": 60, "y": 120 },
            { "x": 150, "y": 120 }
        ];

        // data-connection과 data-answer-single 비교
        const drawingGridArea = document.querySelector(".drawing_grid_area");
        const connectionData = JSON.parse(drawingGridArea.dataset.connection || "[]");
        const answerSingle = JSON.parse(drawingGridArea.dataset.answerSingle || "[]");
        const additionalAnswers = [];

        const answerData = currentPage === "page_1" ? answerData1 : answerData2;
        const isConnectionMatch = answerMatch(answerData, lines);

        // const isAnswerMatch = JSON.stringify(
        //     connectionData.map(item => JSON.stringify(item)).sort()
        // ) === JSON.stringify(
        //     answerSingle.map(item => JSON.stringify(item)).sort()
        // );

        // 정답 확인
        const isCorrect = checkAnswer(connectionData, answerSingle, additionalAnswers);
        console.log("정답 여부:", isCorrect);

        // 최종 정답 여부
        return isConnectionMatch && isCorrect;
    }

    defineButtonClassRules([
>>>>>>> b1dd6843 (초기 커밋)
        {
            selector: ".img_paper .drawing_grid_area",
            key: "custom_submit_btn_active",
            test: (el) => {
                return el.dataset.connection !== undefined && el.dataset.connection !== "[]";
            }
        },
<<<<<<< HEAD
        // {
        //     selector: ".grid-canvas .userLines",
        //     key: "custom_reset_btn_active",
        //     test: (el) => el.children.length > 0, // 자식 노드가 있으면 활성화
        // },
=======
>>>>>>> b1dd6843 (초기 커밋)
    ]);
});