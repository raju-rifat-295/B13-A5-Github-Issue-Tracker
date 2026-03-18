let totalALL = 0;
let totalOpen = 0;
let totalClosed = 0;


const cardsContainer = document.getElementById('cards-container');
const openContainer = document.getElementById('open-container');
const closedContainer = document.getElementById('closed-container');
const count = document.getElementById('count');
const searchContainer = document.getElementById('search-container');
const searchBtn = document.getElementById('search-btn');
const input = document.getElementById('input');

searchBtn.addEventListener('click', () => {

    cardsContainer.classList.add('hidden');
    openContainer.classList.add('hidden');
    closedContainer.classList.add('hidden');
    searchContainer.classList.remove('hidden');

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${input.value}`)
    .then((res) => res.json())
    .then(
        (json)=>{
            displaySearch(json.data);
        }
    );
})


const loadAllIssue = () => {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
        .then((res) => res.json())
        .then((json) => {
            displayAllIssue(json.data);
            displayOpen(json.data);
            displayClosed(json.data);
            displaySearch(json.data);
        });
};

const toggleBtn = [
    document.getElementById('all-btn'),
    document.getElementById('open-btn'),
    document.getElementById('closed-btn')
]



function toggleStyle(id) {
    toggleBtn.forEach((item) => {
        item.classList.remove('bg-[#4A00FF]', 'text-white');
    })
    toggleBtn.forEach((item) => {
        item.classList.add('border-[#E4E4E7]', 'text-[#64748B]');
    })

    const clicked = document.getElementById(id);
    clicked.classList.add('bg-[#4A00FF]', 'text-white');

    if (id == 'all-btn') {
        cardsContainer.classList.remove('hidden');
        openContainer.classList.add('hidden');
        closedContainer.classList.add('hidden');
        searchContainer.classList.add('hidden');

        count.innerText = countIssue(id);
    }
    if (id == 'open-btn') {
        cardsContainer.classList.add('hidden');
        openContainer.classList.remove('hidden');
        closedContainer.classList.add('hidden');
        searchContainer.classList.add('hidden');

        count.innerText = countIssue(id);
    }
    if (id == 'closed-btn') {
        cardsContainer.classList.add('hidden');
        openContainer.classList.add('hidden');
        closedContainer.classList.remove('hidden');
        searchContainer.classList.add('hidden');

        count.innerText = countIssue(id);
    }
}

function countIssue(id) {
    if (id == 'all-btn') {
        return totalALL;
    }
    else if (id == 'open-btn') {
        return totalOpen;
    }
    else{
        return totalClosed;
    }
}



function getBorderColor(element) {
    if (element.status == 'open') {
        return "border-[#00A96E]";
    } else {
        return "border-[#A855F7]";
    }
}

function statusIcon(element) {
    if (element.status == 'open') {
        return 'Open-Status.png';
    }
    else {
        return 'Closed- Status .png';
    }
}

function priority(element) {
    if (element.priority == 'high') {
        return `<div
                                    class="h-6 w-20 px-[25px] py-1.5 text-[12px] font-medium rounded-[100px] text-[#EF4444] bg-[#FEECEC] flex items-center">
                                    <p>HIGH</p>
                                </div>`;
    }
    else if (element.priority == 'medium') {
        return `<div
                                    class="h-6 w-20 px-[25px] py-1.5 text-[12px] font-medium rounded-[100px] text-[#F59E0B] bg-[#FFF6D1] flex items-center justify-center">
                                    <p>MEDIUM</p>
                                </div>`;
    }
    else {
        return `<div
                                    class="h-6 w-20 px-[25px] py-1.5 text-[12px] font-medium rounded-[100px] text-[#9CA3AF] bg-[#EEEFF2] flex items-center">
                                    <p>LOW</p>
                                </div>`;
    }
}

function labels(element) {

    let badgeS = '';

    element.labels.forEach(
        (badge) => {
            let badgeHTML = '';

            if (badge == 'bug') {
                badgeHTML = `
                <div
                                    class="h-6 px-2 py-1.5 bg-[#FEECEC] flex items-center border border-[#FECACA] rounded-[100px] text-[12px] text-[#EF4444] font-medium">
                                    <i class="fa-solid fa-bug"></i>
                                    <p>BUG</p>
                                </div>
                `
            }
            else if (badge == 'help wanted') {
                badgeHTML = `
                <div
                                    class="h-6 px-2 py-1.5 bg-[#FFF8DB] flex items-center border border-[#FDE68A] rounded-[100px] text-[12px] text-[#D97706] font-medium">
                                    <i class="fa-solid fa-life-ring"></i>
                                    <p>HELP WANTED</p>
                                </div>
                `

            }
            else if (badge == 'enhancement') {
                badgeHTML = `
                <div
                                    class="h-6 px-2 py-1.5 bg-[#DEFCE8] flex items-center border border-[#BBF7D0] rounded-[100px] text-[12px] text-[#00A96E] font-medium">
                                    <i class="fa-solid fa-wand-magic-sparkles"></i>
                                    <p>ENHANCEMENT</p>
                                </div>
                `
            }
            else if (badge == 'good first issue') {
                badgeHTML = `
                <div
                                    class="h-6 px-2 py-1.5 bg-[#E0F2FE] flex items-center border border-[#BAE6FD] rounded-[100px] text-[12px] text-[#0284C7] font-medium">
                                    <i class="fa-solid fa-seedling"></i>
                                    <p>GOOD FIRST ISSUE</p>
                                </div>
                `
            }
            else {
                badgeHTML = `
                <div
                                    class="h-6 px-2 py-1.5 bg-[#F3E8FF] flex items-center border border-[#E9D5FF] rounded-[100px] text-[12px] text-[#7C3AED] font-medium">
                                    <i class="fa-solid fa-book"></i>
                                    <p>DOCUMENTATION</p>
                                </div>
                `
            }
            badgeS = badgeS + badgeHTML;
        }
    )
    return badgeS;
}

const displayAllIssue = (arr) => {
    cardsContainer.innerHTML = '';
    totalALL = 0;
    arr.forEach(
        (arr) => {
            totalALL++;
        }
    )
    arr.forEach(
        (element) => {
            const card = document.createElement('div');
            card.className = `grid grid-rows-3 card w-64 p-4 shadow-[0_3px_6px_0_rgba(0,0,0,0.08)] border-t-4 ${getBorderColor(element)} text-left`

            card.innerHTML = `
            <div class="row-span-2">
                            <div class="flex justify-between">
                                <img class="size-6" src="./assets/${statusIcon(element)}" alt="">
                                ${priority(element)}
                            </div>
                            <h2 class="card-title mt-3 text-[14px] font-semibold">${element.title}
                            </h2>
                            <p class="text-[12px] font-normal text-[#64748B] mt-2">${element.description}</p>
                            <div  class="badge-container flex flex-col gap-1 mt-3">
                                ${labels(element)
                }
                            </div>
                        </div>
                        <div class="row-span-1">
                            <hr class="border-gray-300 mt-1.5">
                            <p class="author mt-4 font-normal text-[#64748B] text-[12px]">${element.id} by ${element.author}</p>
                            <p class="date mt-2 font-normal text-[#64748B] text-[12px]">Assignee: ${element.assignee}</p>
                            <p class="date mt-2 font-normal text-[#64748B] text-[12px]">Created At: ${element.createdAt}</p>
                            <p class="date mt-2 font-normal text-[#64748B] text-[12px]">Updated At: ${element.updatedAt}</p>
                        </div>
            `;

            cardsContainer.appendChild(card);
        }
    )
}

const displayOpen = (arr) => {

    openContainer.innerHTML = '';
    totalOpen = 0;
    arr.forEach(
        (arr) => {
            if (arr.status == 'open') {
                totalOpen++;
            }
        }
    )

    arr.forEach(
        (element) => {
            const card = document.createElement('div');
            card.className = `grid grid-rows-3 card w-64 p-4 shadow-[0_3px_6px_0_rgba(0,0,0,0.08)] border-t-4 ${getBorderColor(element)} text-left`
            if (element.status == 'closed') {
                card.classList.add('hidden');
            }
            card.innerHTML = `
            <div class="row-span-2">
                            <div class="flex justify-between">
                                <img class="size-6" src="./assets/${statusIcon(element)}" alt="">
                                ${priority(element)}
                            </div>
                            <h2 class="card-title mt-3 text-[14px] font-semibold">${element.title}
                            </h2>
                            <p class="text-[12px] font-normal text-[#64748B] mt-2">${element.description}</p>
                            <div  class="badge-container flex flex-col gap-1 mt-3">
                                ${labels(element)
                }
                            </div>
                        </div>
                        <div class="row-span-1">
                            <hr class="border-gray-300 mt-1.5">
                            <p class="author mt-4 font-normal text-[#64748B] text-[12px]">${element.id} by ${element.author}</p>
                            <p class="date mt-2 font-normal text-[#64748B] text-[12px]">Assignee: ${element.assignee}</p>
                            <p class="date mt-2 font-normal text-[#64748B] text-[12px]">Created At: ${element.createdAt}</p>
                            <p class="date mt-2 font-normal text-[#64748B] text-[12px]">Updated At: ${element.updatedAt}</p>
                        </div>
            `;

            openContainer.appendChild(card);
        }
    )
}

const displayClosed = (arr) => {

    closedContainer.innerHTML = '';
    totalClosed = 0;
    arr.forEach(
        (arr) => {
            if (arr.status == 'closed') {
                totalClosed++;
            }
        }
    )

    arr.forEach(
        (element) => {
            const card = document.createElement('div');
            card.className = `grid grid-rows-3 card w-64 p-4 shadow-[0_3px_6px_0_rgba(0,0,0,0.08)] border-t-4 ${getBorderColor(element)} text-left`
            if (element.status == 'open') {
                card.classList.add('hidden');
            }
            card.innerHTML = `
            <div class="row-span-2">
                            <div class="flex justify-between">
                                <img class="size-6" src="./assets/${statusIcon(element)}" alt="">
                                ${priority(element)}
                            </div>
                            <h2 class="card-title mt-3 text-[14px] font-semibold">${element.title}
                            </h2>
                            <p class="text-[12px] font-normal text-[#64748B] mt-2">${element.description}</p>
                            <div  class="badge-container flex flex-col gap-1 mt-3">
                                ${labels(element)
                }
                            </div>
                        </div>
                        <div class="row-span-1">
                            <hr class="border-gray-300 mt-1.5">
                            <p class="author mt-4 font-normal text-[#64748B] text-[12px]">${element.id} by ${element.author}</p>
                            <p class="date mt-2 font-normal text-[#64748B] text-[12px]">Assignee: ${element.assignee}</p>
                            <p class="date mt-2 font-normal text-[#64748B] text-[12px]">Created At: ${element.createdAt}</p>
                            <p class="date mt-2 font-normal text-[#64748B] text-[12px]">Updated At: ${element.updatedAt}</p>
                        </div>
            `;

            closedContainer.appendChild(card);
        }
    )
}

const displaySearch = (arr) => {
    searchContainer.innerHTML = '';
    count.innerText = arr.length;
    
    arr.forEach(
        (element) => {
            const card = document.createElement('div');
            card.className = `grid grid-rows-3 card w-64 p-4 shadow-[0_3px_6px_0_rgba(0,0,0,0.08)] border-t-4 ${getBorderColor(element)} text-left`
            
            card.innerHTML = `
            <div class="row-span-2">
                            <div class="flex justify-between">
                                <img class="size-6" src="./assets/${statusIcon(element)}" alt="">
                                ${priority(element)}
                            </div>
                            <h2 class="card-title mt-3 text-[14px] font-semibold">${element.title}
                            </h2>
                            <p class="text-[12px] font-normal text-[#64748B] mt-2">${element.description}</p>
                            <div  class="badge-container flex flex-col gap-1 mt-3">
                                ${labels(element)
                }
                            </div>
                        </div>
                        <div class="row-span-1">
                            <hr class="border-gray-300 mt-1.5">
                            <p class="author mt-4 font-normal text-[#64748B] text-[12px]">${element.id} by ${element.author}</p>
                            <p class="date mt-2 font-normal text-[#64748B] text-[12px]">Assignee: ${element.assignee}</p>
                            <p class="date mt-2 font-normal text-[#64748B] text-[12px]">Created At: ${element.createdAt}</p>
                            <p class="date mt-2 font-normal text-[#64748B] text-[12px]">Updated At: ${element.updatedAt}</p>
                        </div>
            `;

            searchContainer.appendChild(card);
        }
    )
}






loadAllIssue();



