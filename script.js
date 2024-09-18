    const buttonCart = document.querySelectorAll('.button__cart');

    const handleCartButtonClick = (event) => {

        const containerCart = document.querySelector('.container__cart');

        const itemDesert = document.querySelector('.item__desert');
        if (itemDesert) {
            itemDesert.remove();
        }

        const article = event.currentTarget.closest('article');
        const semboldFont = article.querySelector('.sembold__font');
        const itemName = semboldFont ? semboldFont.textContent : '';
        
        const priceElement = article.querySelector('.price-design');
        const itemPrice = priceElement ? parseFloat(priceElement.textContent.replace('$', '')) : 0;
        
        if (itemName) {
            let cartItem = containerCart.querySelector(`.cart__item[data-name="${itemName}"]`);
            
            if (cartItem) {           
                
            } else {
                const cartItemHTML = `
                <div class="cart__item" data-name="${itemName}">
                    <div class="desert__remove"> 
                        <span class="cart__name size__small">${itemName}</span>
                        <img src="img/icon-remove-item.svg" alt="image" class="remove__card">
                    </div>
                    <div class="text__price">
                        <span class="size__small color__red font__normal quantity-cart">1</span>
                        <span class="size__small color__beige price-more">@ $${itemPrice.toFixed(2)}</span>
                        <span class="size__small color__beige price-more beige__dark font__normal">0</span>
                    </div>
                </div>

                <section class="section__confirme">
                    <div class="price__order">
                        <p>Total</p>
                        <span class="total__price">$0</span>
                    </div>
                    <div class="info__desert">
                        <img src="img/icon-carbon-neutral.svg" alt="image">
                        <p class="size__small">This is a <span class="font__normal">carbon-netural</span> dlivery</p>
                    </div>
                    <div class="confirme__order confirme-order">
                        <p>Confirm Order</p>
                    </div>
                </section>
                `;
                updateTotalItemImage()
                totalPriceUpdate();
                updateCartText();
                
                const sectionConfirme = document.querySelector('.section__confirme');

                if (sectionConfirme) {
                    sectionConfirme.remove();
                }

                containerCart.insertAdjacentHTML('beforeend', cartItemHTML);

                const confirmeOrderButton = containerCart.querySelector('.confirme-order');
                if (confirmeOrderButton) {
                    confirmeOrderButton.addEventListener('click', () => {
                        const overlay = document.createElement('div');
                        const mainShop = document.querySelector('.main__shop');

                        overlay.classList.add('overlay');
                        
                        if (overlay) {
                            overlay.innerHTML = `
                            <div class="confirm__order">
                                <img src="img/icon-order-confirmed.svg" alt="image">
                                <h1 class="padding__block-small">Order Confirmed</h1>
                                <p class="color__beige">We hope you enjoy your food!</p>

                                <div class="total__item"></div>

                                <div class="confirme__order new-order">
                                    <p>Start New Order</p>
                                </div>
                                
                            </div>
                            `;
                        }

                        mainShop.appendChild(overlay);

                        const confirmeOrder = document.querySelector('.new-order');
                            if (confirmeOrder) {
                            confirmeOrder.addEventListener('click', handleConfirmeOrderClick);
                        }

                        updateTotalItemImage();
                    });
            }
            
    }

        const container = event.currentTarget.closest('.container__img');
        const img = container.querySelector('.img__class');
        if (img) {
            img.classList.add('border__img');
        }

        const containerForButton = container.querySelector('.container');
        if (containerForButton) {
            containerForButton.innerHTML = `
                <button class="button__selection" data-name="${itemName}" data-number="1">
                    <img src="img/icon-decrement-quantity.svg" alt="image" class="img__addrmove remove__class">
                    <span class="number__cart">1</span>
                    <img src="img/icon-increment-quantity.svg" alt="image" class="img__addrmove add_class">  
                </button>
            `;
        }
    }};

    buttonCart.forEach(button => button.addEventListener('click', handleCartButtonClick));

    const handleButtonClick = (event) => {
        const buttonSelection = event.currentTarget.querySelector('.button__selection');

        if (buttonSelection) {
            const numberCartElement = buttonSelection.querySelector('.number__cart');
            let cartQuantity = parseInt(buttonSelection.getAttribute('data-number'), 10);
            const itemName = buttonSelection.getAttribute('data-name');

            if (event.target.classList.contains('remove__class')) {
                if (cartQuantity > 1) { 
                    cartQuantity--;
                    numberCartElement.textContent = cartQuantity;
                    buttonSelection.setAttribute('data-number', cartQuantity);
                }
            } else if (event.target.classList.contains('add_class')) {
                cartQuantity++;
                numberCartElement.textContent = cartQuantity;
                buttonSelection.setAttribute('data-number', cartQuantity);
            }

            const cartItem = document.querySelector(`.cart__item[data-name="${itemName}"]`);
            if (cartItem) {
                const quantityCartElement = cartItem.querySelector('.quantity-cart');
                if (quantityCartElement) {
                    quantityCartElement.textContent = cartQuantity + 'x';
                }
                const itemPrice = parseFloat(cartItem.querySelector('.price-more.price-more').textContent.replace('@ $', ''));
                const moreElement = cartItem.querySelector('.price-more.price-more:last-of-type');
                moreElement.textContent = `$${(itemPrice * cartQuantity).toFixed(2)}`;
                updateTotalItemImage();
                totalPriceUpdate();
                updateCartText();
            }
        }
    };

    document.querySelectorAll('.container').forEach(container => container.addEventListener('click', handleButtonClick));

    const updateCartText = () => {
        const cartText = document.querySelector('.span__text');
        if (cartText) {
            const quantityCartElements = document.querySelectorAll('.quantity-cart');
            const totalQuantity = Array.from(quantityCartElements)
            .reduce((total, qtyElement) => total + (parseInt(qtyElement.textContent) || 0), 0);
            cartText.textContent = `Your Cart (${totalQuantity})`;

        }
    };
    
    const containerCart = document.querySelector('.container__cart');

    containerCart.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove__card')) {
            const cartItem = event.target.closest('.cart__item')
            if (cartItem) {
                
                const itemName = cartItem.getAttribute('data-name');

                const semboldFonts = document.querySelectorAll('.sembold__font');

                semboldFonts.forEach((semboldFont) => {
                    if (semboldFont.textContent.trim() === itemName) {
                        const desertBlock = semboldFont.closest('.dessert__block');
                
                        if (desertBlock) {
                            const containerImg = desertBlock.querySelector('.img__class');
                            const buttonSelection = desertBlock.querySelector('.button__selection');
                            const container = desertBlock.querySelector('.container');
                
                            if (container) {
                              
                                container.innerHTML = `
                                    <button class="button__cart">
                                        <img src="img/icon-add-to-cart.svg" alt="image">
                                        Add to Cart
                                    </button>
                                `;
                            }
                
                            if (containerImg) {
                                containerImg.classList.remove('border__img');
                            }
                
                            if (buttonSelection) {
                                buttonSelection.remove();
                            }
                           
                        }
                        
                    }
                });

            cartItem.remove();
                updateTotalItemImage();
                updateNumberItem();
                totalPriceUpdate();
                updateCartText();
            }
        }
     const buttonCart = document.querySelectorAll('.button__cart');
        buttonCart.forEach(button => button.addEventListener('click', handleCartButtonClick));
        
    });

    const totalPriceUpdate = () => {
        const containerCart = document.querySelector('.container__cart');
        const totalElementPrice = containerCart.querySelector('.total__price');
    
        if (!totalElementPrice) {
            return;
        }

        const priceMoreElement = document.querySelectorAll('.price-more');

        let totalPrice = 0;
        priceMoreElement.forEach(el => {
            const value = parseFloat(el.textContent.replace('$', '')) || 0
            totalPrice += value
        })

        totalElementPrice.textContent = `$${totalPrice.toFixed(2)}`
    }
    
    const updateNumberItem = () => {
        const cartItems = document.querySelectorAll('.cart__item');
    
        let numberItem = 0;
        
        cartItems.forEach(item => {
            const quantityCart = item.querySelector('.quantity-cart');
            const quantity = parseInt(quantityCart.textContent) || 0
            numberItem += quantity
        })

        const spanText = document.querySelector('.span__text');
        if (spanText) {

            spanText.textContent = `Your Cart $${numberItem}`
        }

        const containerCart = document.querySelector('.container__cart');
        const sectionConfirme = document.querySelector('.section__confirme');
        if (numberItem === 0) {
            const itemDesertHtml = `
            <div class="item__desert">
                <img src="img/illustration-empty-cart.svg" alt="image">
                <span class="color__beige">Items added will appear here</span>
            </div> 
            `;
            sectionConfirme.remove();
            containerCart.insertAdjacentHTML('beforeend', itemDesertHtml);
        }
    };

    const dessertImages = {
        'Waffle with Berries': 'img/image-waffle-thumbnail.jpg',
        'Vanilia Bean Creame Brulee': 'img/image-creme-brulee-thumbnail.jpg',
        'Macaron Mix of Five':  'img/image-macaron-thumbnail.jpg',
        'Classic Tiramisu': 'img/image-tiramisu-thumbnail.jpg',
        'Pistachio Baklava': 'img/image-baklava-thumbnail.jpg',
        'Lemon meringue Pie': 'img/image-meringue-thumbnail.jpg',
        'Red Velvet Cake': 'img/image-cake-thumbnail.jpg',
        'Salted Caramel Cake': 'img/image-brownie-thumbnail.jpg',
        'Vanilia Panna Cotta':  'img/image-panna-cotta-thumbnail.jpg'
    };
    
    const updateTotalItemImage = () => {
        const totalItemDiv = document.querySelector('.total__item');
        if (!totalItemDiv) return;
        
        const cartItems = document.querySelectorAll('.cart__item');
       

        cartItems.forEach(cartItem => {
            const itemName = cartItem.getAttribute('data-name');
            if (dessertImages[itemName]) {
                const quantityCartElement = cartItem.querySelector('.quantity-cart');
                const priceMore = cartItem.querySelector('.price-more');
                const priceMoreLast = cartItem.querySelector('.price-more:last-of-type')
                const totalElementPrice = document.querySelector('.total__price');

                const returnOrder = document.querySelector('.return-order');
                const returnPrice = document.querySelector('.return-price');

                if (returnOrder) {
                    returnOrder.remove();
                }

                if (returnPrice) {
                    returnPrice.remove();
                }

                const elementPrice = totalElementPrice.textContent;
                const lastMore = priceMoreLast.textContent;
                const more = priceMore.textContent;
                const quantity = quantityCartElement.textContent;
    
                totalItemDiv.innerHTML += `
                    <div class="cart__item nowrap">
                        <img src="${dessertImages[itemName]}" alt="${itemName}" class="img__thumbanail">
                            <div class="order__content">
                                <div class="order__desert">
                                    <span class="size__small cart__name">${itemName}</span>
                                <div class="price__content">
                                    <span class="font__normal color__red size__small">${quantity}</span>

                                    <span class="size__small color__beige">${more}<span>
                                </div>
                            </div>
                                <span class="order__total font__normal">${lastMore}</span>
                            </div>
                        </div>
                    <div class="price__order return-price">
                        <span class="order__price" return-order">Order Total</span>  

                        <span class="total__price">${elementPrice}</span>
                    </div>
                    `;
            }
        });
    };

    const handleConfirmeOrderClick = () => {
        const overlay = document.querySelector('.overlay');  

        if (overlay) {
            overlay.remove()
        }

        const removeCardItem = document.querySelectorAll('.remove__card');

        removeCardItem.forEach(removeCart => {
            removeCart.click();
        })
    };

    const imgDesserts = [
        { selector: '.waffle-image', mobile: 'img/image-waffle-mobile.jpg', tablet: 'img/image-waffle-tablet.jpg' },
        { selector: '.blrulee-image', mobile: 'img/image-creme-brulee-mobile.jpg', tablet: 'img/image-creme-brulee-tablet.jpg' },
        { selector: '.macaron-image', mobile: 'img/image-macaron-mobile.jpg', tablet: 'img/image-macaron-tablet.jpg' },
        { selector: '.tiramisu-image', mobile: 'img/image-tiramisu-mobile.jpg', tablet: 'img/image-tiramisu-tablet.jpg' },
        { selector: '.baklava-image', mobile: 'img/image-baklava-mobile.jpg', tablet: 'img/image-baklava-tablet.jpg' },
        { selector: '.meringue-image', mobile: 'img/image-meringue-mobile.jpg', tablet: 'img/image-meringue-tablet.jpg' },
        { selector: '.cake-image', mobile: 'img/image-cake-mobile.jpg', tablet: 'img/image-cake-tablet.jpg' },
        { selector: '.brownie-image', mobile: 'img/image-brownie-mobile.jpg', tablet: 'img/image-brownie-tablet.jpg' },
        { selector: '.panna-image', mobile: 'img/image-panna-cotta-mobile.jpg', tablet: 'img/image-panna-cotta-tablet.jpg' }
    ]

    function updateImages() {
        imgDesserts.forEach(({ selector, mobile, tablet }) => {
            const allImgDesserts = document.querySelector(selector);
            if(allImgDesserts) {
                allImgDesserts.src = window.innerWidth <= 1050 ? mobile : tablet;
            }
        });
    }

    window.onload = updateImages;
    window.onresize = updateImages;