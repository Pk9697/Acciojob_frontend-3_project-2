import updatedMenu from './data/data.js'

const menu = []
const cardContainer = document.querySelector('.card-container')

const getMenu = async () => {
	const url =
		'https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json'

	try {
		const res = await fetch(url)
		const data = await res.json()
		// data.forEach((item, idx) => (item.imgSrc = updatedMenu[idx].imgSrc))
		menu.push(...updatedMenu)
		cardContainer.innerHTML = menu
			.map((item) => {
				return `
            <div class="card">
                <img
                    class="card-img-top"
                    src="${item.imgSrc}"
                    alt="Card image cap"
                />
                <div
                    class="card-body pb-0 d-flex justify-content-between align-items-center"
                >
                    <div>
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">$${item.price}/-</p>
                    </div>
                    <a href="#" class="btn btn-card">
                        <i class="fa-solid fa-plus"></i>
                    </a>
                </div>
            </div>
            `
			})
			.join(' ')
	} catch (error) {
		console.log(error)
	}
}

await getMenu()

// ** USING PROMISES

const order = {
}

const takeOrder = (order) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const burgers = menu.filter((item) =>
				item.name.toLowerCase().includes('burger')
			)

			const cart = []

			while (cart.length !== 3) {
				const randomBurger = burgers[Math.floor(Math.random() * burgers.length)]
				if (cart.some((item) => item.id === randomBurger.id)) continue
				cart.push(randomBurger)
            }
            resolve({
                ...order,
				cart,
			})
		}, 2500)
	})
}

const orderPrep = (order) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                ...order,
                order_status: true,
                paid: false,
            })
        }, 1500)
    })
}

const payOrder = (order) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                ...order,
                paid: true,
            })
        }, 1000)
    })
}

const thankYouFnc = (order) => {
	if (order.paid) {
		alert('Thank you for eating with us today!')
    } else {
        alert('Please pay your order!')
    }
}

takeOrder(order)
    .then((order) => orderPrep(order))
    .then((order) => payOrder(order))
    .then((order) => thankYouFnc(order))
    .catch((error) => {
        console.error(error)
    })


// ** USING ASYNC AWAIT

// const timeout = (ms) => {
// 	return new Promise((resolve) => setTimeout(resolve, ms))
// }

// const takeOrder = async () => {
// 	try {
// 		await timeout(2500)
// 		const burgers = menu.filter((item) =>
// 			item.name.toLowerCase().includes('burger')
// 		)

// 		const cart = []

// 		while (cart.length !== 3) {
// 			const randomBurger = burgers[Math.floor(Math.random() * burgers.length)]
// 			if (cart.some((item) => item.id === randomBurger.id)) continue
// 			cart.push(randomBurger)
// 		}

// 		return {
// 			cart,
// 		}
// 	} catch (error) {
// 		console.log(error)
// 	}
// }

// const order = await takeOrder()

// // console.log(order)

// const orderPrep = async () => {
// 	try {
// 		await timeout(1500)
// 		return {
// 			...order,
// 			order_status: true,
// 			paid: false,
// 		}
// 	} catch (error) {
// 		console.log(error)
// 	}
// }

// const orderStatus = await orderPrep()

// const payOrder = async () => {
// 	try {
// 		await timeout(1000)
// 		return {
// 			...orderStatus,
// 			order_status: true,
// 			paid: true,
// 		}
// 	} catch (error) {
// 		console.log(error)
// 	}
// }

// const pay = await payOrder()

// const thankYouFnc = async () => {
// 	if (pay.paid) {
// 		alert('Thank you for eating with us today!')
// 	}
// }

// await thankYouFnc()
