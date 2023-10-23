function moVie() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmMzOTQ1YzdhNjc3YmE3MzEwNTIyNDdjZmE4NmE0MSIsInN1YiI6IjY1MmY0MzIwZWE4NGM3MDE0ZTA3MjAxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QvPWOqFcSVODPn163MVHI2b4F4a4Y_TQEFZeeyMW1yE'
        }
    };

    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
        .then(response => response.json())
        .then(data => {
            let movieList = data.results;

            // 검색 기능 (필수요소 getElementById)
            const searchInput = document.getElementById('searchInput');
            const searchButton = document.getElementById('searchButton');
            const mainCard = document.getElementById('mainCard');
            document.getElementById('mainCard').style.width = '500px';

            // 제목 검색하기 (필수요소 filter)
            searchButton.addEventListener('click', function () {
                // 선택사항 : 대소문자 상관 없이 검색 가능하게 >> input을 소문자로 바꿔서 저장
                const searchValue = searchInput.value.toLowerCase();
                const filteredMovies = movieList.filter(function (movie) {
                    return movie.title.toLowerCase().includes(searchValue);
                });
                displayMovies(filteredMovies, mainCard);

            });
            displayMovies(movieList, mainCard);

        });
}

function displayMovies(movies, container) {
    container.innerHTML = ''; // 카드 리셋

    //필수요소 forEach
    movies.forEach(function (movie) {
        // 필수값 4개 + 팝업 id
        const imAge = 'https://image.tmdb.org/t/p/w500' + movie['poster_path'];
        const tiTle = movie['title'];
        const overView = movie['overview'];
        const voTe = movie['vote_average'];
        const movieId = movie['id'];

        // 카드 만들기 (필수요소 createElement)
        const card = document.createElement('div');
        card.classList.add('singleCard'); // 생성되는 카드(div)에 속성 >> css적용
        const createImgag = document.createElement('img');
        const createTitle = document.createElement('p');
        const createOver = document.createElement('p');
        const createVote = document.createElement('p');

        createImgag.src = imAge;
        createTitle.textContent = tiTle;
        createOver.textContent = overView;
        createVote.textContent = '평점 : ' + voTe;

        card.append(createImgag, createTitle, createOver, createVote);
        container.append(card);

        // 카드 클릭 시 팝업 & (필수요소 : 화살표함수)
        card.addEventListener('click', () => {
            alert("ID = " + movieId);
        });
    });
}
moVie();



