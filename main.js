fetch('https://imdb-com.p.rapidapi.com/auto-complete?q=game', {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '63dc393c08mshe7205feff7f8600p1c6578jsn87165f8349ca',
        'X-RapidAPI-Host': 'imdb-com.p.rapidapi.com'
    }
})
    .then(response => response.json())
    .then(responseData => {
        const list = responseData.data.d;
        list.map((item, index) => {
            // Skip the first item (index 0)
            if (index === 0) return;

            if (item.l && item.i && item.i.imageUrl) {
                const name = item.l;
                const poster = item.i.imageUrl;
                const movie = `<div class="card">
                            <div class="content-card">
                                <img 
                                    src="${poster}" alt="..."
                                />
                            </div>
                        </div>`;

                document.querySelector(".movies").innerHTML += movie;
            }
            const card = document.querySelectorAll(".card");

            card.forEach(el => {
                el.addEventListener("mousemove", e => {
                    let elRect = el.getBoundingClientRect();
                    console.log(e)
                    let x = e.clientX - elRect.x;
                    let y = e.clientY - elRect.y;

                    let midCardWidth = elRect.width / 2;
                    let midCardHeight = elRect.height / 2;

                    let angleY = -(x - midCardWidth) / 8;
                    let angleX = (y - midCardHeight) / 8;

                    el.children[0].style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.1)`;
                });

                el.addEventListener("mouseleave", () => {
                    el.children[0].style.transform = `rotateX(0) rotateY(0)`;
                })
            });
        });
    })
    .catch(err => {
        console.error(err);
    });
