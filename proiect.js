
// adauga in cos
document.addEventListener('DOMContentLoaded', (event) => 
{
    const mesajConfirmare = document.getElementById('mesajConfirmare');
    function arataMesajConfirmare() 
    {
        const randomFontSize = Math.floor(Math.random() * 3) + 2;
        mesajConfirmare.style.fontSize = `${randomFontSize}vw`;
        mesajConfirmare.classList.add('show');
        mesajConfirmare.style.display = 'block';
        setTimeout(() => 
        {
            mesajConfirmare.classList.remove('show');
            setTimeout(() => 
            {
                mesajConfirmare.style.display = 'none';
            }, 500); 
        }, 2000);
    }
    function adaugainCos(product) 
    {
        let cos = JSON.parse(localStorage.getItem('cos')) || [];
        let exista = false;
        for(let i = 0; i <cos.length; ++i)
        {
            if(cos[i].name === product.name)
            {
                cos[i].quantity += 1;
                exista = true;
                break;
            }
        }
        if(!exista)
        {
            product.quantity = 1;
            cos.push(product);
        }
        localStorage.setItem('cos', JSON.stringify(cos));
        arataMesajConfirmare();
        // alert('Produs adaugat in cos!');
    }
    const buttons = document.querySelectorAll('.buton_cos');
    buttons.forEach(button => 
    {
        button.addEventListener('click', (event) => 
        {
            const productElement = event.target.closest('.produs');
            const product = 
            {
                name: productElement.getAttribute('nume'),
                price: productElement.getAttribute('pret'),
                img: productElement.getAttribute('poza')
            };
            adaugainCos(product);
        });
    });
    if (document.getElementById('cos_cumparaturi')) 
    {
        veziCosul();
    }
    function veziCosul() 
    {
        const cart = JSON.parse(localStorage.getItem('cos')) || [];
        const cartContainer = document.getElementById('cos_cumparaturi');
        cartContainer.innerHTML = '';

        if (cart.length === 0) 
        {
            const emptyMessage = document.createElement('p');
            emptyMessage.textContent = 'Cosul este gol.';
            cartContainer.appendChild(emptyMessage);
        } 
        else 
        {
            const cartList = document.createElement('ul');
            cart.forEach(item => 
            {
                const listItem = document.createElement('li');
                const productImage = document.createElement('img');
                productImage.src = item.img;
                const productInfo = document.createElement('span');
                productInfo.textContent = `${item.name} - ${item.price} RON - x${item.quantity}`;
                listItem.appendChild(productImage);
                listItem.appendChild(productInfo);
                cartList.appendChild(listItem);
            });
            cartContainer.appendChild(cartList);
        }
        const clearButton = document.createElement('button');
        clearButton.textContent = 'Goleste cosul';
        clearButton.className = "button";
        clearButton.addEventListener('click', golesteCosul);
        cartContainer.appendChild(clearButton);
    }
    function golesteCosul() 
    {
        localStorage.removeItem('cos');
        location.reload();
    }
});

// inregistrare
document.addEventListener('DOMContentLoaded', (event) => 
{
    const inregistrare = document.getElementById('inregistrare');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const mesaje = document.getElementById('Mesaje');

    inregistrare.addEventListener('submit', function(event) 
    {
        event.preventDefault();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/; 
        let valid = true;
        let messages = [];

        if (!emailPattern.test(emailInput.value)) 
        {
            valid = false;
            messages.push('Email-ul nu este valid.');
            emailInput.style.borderColor = 'red';
        } else 
        {
            emailInput.style.borderColor = 'green';
        }

        if (!passwordPattern.test(passwordInput.value)) 
        {
            valid = false;
            messages.push('Parola trebuie sa aiba minim 5 caractere, incluzand cel putin o litera si o cifra.');
            passwordInput.style.borderColor = 'red';
        } else 
        {
            passwordInput.style.borderColor = 'green';
        }

        if (passwordInput.value !== confirmPasswordInput.value)     
        {
            valid = false;
            messages.push('Parolele nu se potrivesc.');
            confirmPasswordInput.style.borderColor = 'red';
        } else 
        {
            confirmPasswordInput.style.borderColor = 'green';
        }

        mesaje.innerHTML = '';
        if (!valid) 
        {
            messages.forEach(message => 
            {
                const p = document.createElement('p');
                p.textContent = message;
                p.style.color = 'red';
                mesaje.appendChild(p);
            });
        } else 
        {
            mesaje.innerHTML = '<p style="color:green;">Contul a fost creat cu succes!</p>';
        }
    });
});

//schimbare fundal dupa adaugare in cos
document.addEventListener('DOMContentLoaded', (event) => 
{
    const buttons = document.querySelectorAll('.buton_cos');
    buttons.forEach(button => 
    {
        button.addEventListener('click', (event) => 
        {
            const productElement = event.target.closest('.produs');
            productElement.style.backgroundColor = 'rgba(128, 0, 128, 0.5)';
            productElement.style.borderRadius = '10px';
        });
    });
});

// schimbare pagini
document.addEventListener('DOMContentLoaded', (event) => 
{
    const pages = ['tricouri', 'hanorace', 'geci', 'pantaloni'];

    function paginaCurenta() 
    {
        const url = window.location.href;
        for (let i = 0; i < pages.length; i++) 
        {
            if (url.includes(pages[i])) 
            {
                return i;
            }
        }
        return -1;
    }

    function schimbaPagina(pageIndex) 
    {
        if (pageIndex >= 0 && pageIndex < pages.length) 
        {
            window.location.href = `${pages[pageIndex]}.html`;
        }
    }

    document.addEventListener('keydown', (event) => 
    {
        const p = paginaCurenta();

        if (event.key === 'ArrowRight' && p !== -1) 
        {
            schimbaPagina((p + 1) % pages.length);
        } else if (event.key === 'ArrowLeft' && p !== -1) 
        {
            schimbaPagina((p - 1 + pages.length) % pages.length);
        }
    });
});

// slider
document.addEventListener('DOMContentLoaded', (event) => 
{
    const arataSlider = document.getElementById('arataSlider');
    const sliderContainer = document.getElementById('sliderContainer');
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    const products = document.querySelectorAll('.produs');

    arataSlider.addEventListener('click', () => 
    {
        sliderContainer.style.display = 'block';
        arataSlider.style.display = 'none'; 
    });    

    function filterProducts() {
        const maxPrice = parseInt(priceRange.value);
        priceValue.textContent = maxPrice;

        products.forEach(product => 
        {
            const productPrice = parseInt(product.getAttribute('pret'));
            if (productPrice > maxPrice) 
            {
                product.style.display = 'none';
            }
            else 
            {
                product.style.display = 'inline-flex';
            }
        });
    }

    
    priceRange.addEventListener('input', filterProducts);
    filterProducts();
});

//countdown
const dataDeschidere = new Date("Feb 21, 2025 00:00:00").getTime();
const x = setInterval(function() 
{

    const now = new Date().getTime();

    const distance = dataDeschidere - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML = days + " zile " + hours + " ore "
    + minutes + " minute " + seconds + " secunde ";

    if (distance < 0) 
    {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "Magazinul este acum deschis!";
    }
}, 1000);


