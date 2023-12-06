const product = {
    crazy: {
        name: "Crazy",
        price: 1000,
        img: 'images/products/edgar.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    light: {
        name: "Light",
        price: 1000,
        img: 'images/products/2.jpg',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: "CheeseBurger",
        price: 1000,
        img: 'images/products/3.jpg',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: "dBurger",
        price: 1000,
        img: 'images/products/4.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    }
}

const productBtns = document.querySelectorAll('.wrapper__list-btn'),
    basketBtn = document.querySelector('.wrapper__navbar-btn'),
    basketModal = document.querySelector('.wrapper__navbar-basket'),
    closeBasketModal = document.querySelector('.wrapper__navbar-close'),
    basketChecklist = document.querySelector('.wrapper__navbar-checklist'),
    totalPriceBasket = document.querySelector('.wrapper__navbar-totalprice'),
    basketBtnCount = document.querySelector('.warapper__navbar-count')
    btncard = document.querySelector('.wrapper__navbar-bottom');
    print__body = document.querySelector('.print__body'),
    print__footer = document.querySelector('.print__footer')


productBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        plusOrMinus(this);
    });
});

function plusOrMinus(btn) {
    let parent = btn.closest('.wrapper__list-card'),
        parentId = parent.getAttribute('id')
    product[parentId].amount++
    basket()
}

function basket() {
    const productArray = []
    for (const key in product) {
        let totalCount = 0;
        const po = product[key]
        const productCard = document.querySelector(`#${po.name.toLowerCase()}`),
            parentIndecator = productCard.querySelector('.wrapper__list-count')
        if (po.amount) {
            productArray.push(po)
            basketBtnCount.classList.add('active');
            parentIndecator.classList.add('active');
            parentIndecator.innerHTML = po.amount;
            totalCount += po.amount
        } else {
            parentIndecator.classList.remove('active')
            parentIndecator.innerHTML = 0
        }
        basketBtnCount.innerHTML = totalCount
    }
    basketChecklist.innerHTML = ''
    for (let i = 0; i < productArray.length; i++) {
        basketChecklist.innerHTML += cardItemBurger(productArray[i])
    }
    const allCount = totalCountProduct()
    if (allCount) {
        basketBtnCount.classList.add('active')
    } else {
        basketBtnCount.classList.remove('active')
    }
    basketBtnCount.innerHTML = allCount
    totalPriceBasket.innerHTML = totalSummProduct()
}

function totalCountProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].amount
    }
    return total
}
function totalSummProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].totalSum
    }
    return total
}

function cardItemBurger(productData) {
    const {
        name,
        amount,
        img,
        totalSum
    } = productData

    return `
  
  <div class="wrapper__navbar-product">
      <div class="wrapper__navbar-info">
         <img src="${img}" alt="" class="wrapper__navbar-productImage">
         <div class="wrapper__navbar-subInfo">
          <p class="wrapper__navbar-infoName">${name}</p>
          <p class="wrapper__navbar-infoPrice">${totalSum}</p>
         </div>
      </div>
      <div class="wrapper__navbar-option" id="${name.toLowerCase()}_card">
          <button class="wrapper__navbar-symbol fa-plus" data-symbol="+">+</button>
          <span class="wrapper__navbar-count">${amount}</span>
          <button class="wrapper__navbar-symbol fa-minus" data-symbol="-">-</button>
      </div>
  </div>
  `

}

window.addEventListener('click',function(el){
    const btn = el.target
    if (btn.classList.contains('wrapper__navbar-symbol')){
       const attr = btn.getAttribute('data-symbol')
       const parent = btn.closest('.wrapper__navbar-option')
       if (parent){
        const idProduct = parent.getAttribute('id').split('_')[0]
        if(attr == '+') product[idProduct].amount++
        else if(attr == '-') product[idProduct].amount--
        basket()
       }
    }
})

basketBtn.addEventListener('click', () => {
    basketModal.classList.add('active')
})
closeBasketModal.addEventListener('click', () => {
    basketModal.classList.remove('active')
})

btncard.addEventListener('click', function(){
    print__body.innerHTML = ''
    for (const key in product) {
       const {name, amount, totalSum} = product[key];
       if(amount){
        print__body.innerHTML += `
        <div class="print__body-item">
                <div class="print__body-item_name">
                    <span>${name}</span>
                    <span>${amount}</span>
                </div>
                <p class="print__body-item_summ">${totalSum}</p>
            </div>
        `;
       }
           
    }

    print__footer.innerHTML = totalSummProduct()

    window.print();
})










const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

class Quiz
{
	constructor(type, questions, results)
	{

		this.type = type;


		this.questions = questions;

		this.results = results;

		this.score = 0;

		this.result = 0;

		this.current = 0;
	}

	Click(index)
	{
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;


		if(value >= 1)
		{
			correct = index;
		}
		else
		{

			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}


	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}


	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 


class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}


class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}


class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}


	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}


const results = 
[
	new Result("Нашим командам еще много предстоит узнать", 2),
	new Result("Наши команды старались", 5),
	new Result("Вы все молодцы", 8),
	new Result("Поздравляем команды с отличной игрой", 9)
];


const questions = 
[
	new Question("Из скольких разделов, глав и статей состоит Конституция Республики Узбекистан?", 
	[
		new Answer('Преамбулы, 7 разделов, 26 глав, 128 статей', 0),
		new Answer("Преамбулы, 7 разделов, 24 глав, 128 статей ", 0),
		new Answer("Преамбулы, 5 разделов, 26 глав, 126 статей", 0),
		new Answer("Преамбулы, 6 разделов, 26 глав, 128 статей", 1)
	]),
	new Question(" Конституция – это…;", 
	[
		new Answer('Высший закон государства, обладающий верховенством над другими законами', 1),
		new Answer("Один из главных законов страны;", 0),
		new Answer("Основа государственного устройства", 0),
		new Answer("Сборник законов государства", 0)
	]),
	new Question(" Единственным источником государственной власти в Республике Узбекистан является", 
	[
		new Answer('Президент ', 0),
		new Answer("Депутаты Олий Мажлиса", 0),
		new Answer("Конституция", 0),
		new Answer("Народ", 1)
	]),
	new Question("На какой срок избирается Президент", 
	[
		new Answer('На 7 лет', 0),
		new Answer("На 5 лет", 1),
		new Answer("На 4 года", 0),
		new Answer("На 3 года", 0)
	]),
	new Question("Когда была принята Конституция Республики Узбекистан", 
	[
		new Answer('8 декабря 1992 года', 1),
		new Answer("8 декабря 1991 года", 0),
		new Answer("7 декабря 1991 года", 0),
		new Answer("25 декабря 1995 года", 0)

	]),

	new Question("В соответствии с Конституцией к личным правам и свободам относятся", 
	[
		new Answer('Право на жизнь и личную неприкосновенность', 1),
		new Answer("Право на участие в массовых общественных движениях и объединениях", 0),
		new Answer("Право на выбор государственного строя в республике", 0),
		new Answer("Право на свободный выбор работы", 0)

	]),

	new Question("Кто выступает гарантом прав и свобод граждан Узбекистана?", 
	[
		new Answer('Олий Мажлис', 0),
		new Answer("Президент", 1),
		new Answer("Хокимият", 0),
		new Answer("Верховный суд", 0)
	]),
	new Question("Название нашего государства согласно Конституции", 
	[
		new Answer('Узбекская демократическая республика', 0),
		new Answer("Узбекистан или Республика Узбекистан", 1),
		new Answer("Демократическая Республика Узбекистан", 0),
		new Answer("Узбекское государство", 0)
	]),
	new Question("Что такое преамбула ", 
	[
		new Answer('Содержание', 0),
		new Answer("Введение", 1),
		new Answer("Раздел", 0),
		new Answer("Глава", 0)
	]),
	new Question("Что в переводе с латинского означает слово «constitutio»", 
	[
		new Answer('Постоянный закон государства', 0),
		new Answer("«установление», «устройство»", 1),
		new Answer("«учреждение»", 0),
		new Answer("Основной закон", 0)
	]),


];


const quiz = new Quiz(1, questions, results);

Update();


function Update()
{

	if(quiz.current < quiz.questions.length) 
	{

		headElem.innerHTML = quiz.questions[quiz.current].text;


		buttonsElem.innerHTML = "";


		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		

		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		Init();
	}
	else
	{

		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Ваши очки: " + quiz.score;
	}
}

function Init()
{

	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{

		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{

	let correct = quiz.Click(index);


	let btns = document.getElementsByClassName("button");


	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{

		btns[index].className = "button button_correct";
	}


	setTimeout(Update, 1000);
}



