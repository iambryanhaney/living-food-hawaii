import React from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const CHARGES_URL = "http://localhost:3001/charges"

export default function PaymentForm() {
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!stripe || !elements) {
            return
        }

        // const {error, paymentMethod} = await stripe.createPaymentMethod({
        //   type: 'card',
        //   card: elements.getElement(CardElement),
        // })
        // if(error) {
        //     console.log(error)
        // }
        // else {
        //     console.log(paymentMethod)
        // }

        const paymentInfo = {
            name: "Bryan Haney",
            address_line1: "3401 Red River",
            address_line2: "APT 235",
            address_city: "Austin",
            address_city: "Texas",
            address_zip: "78705",
        }
       
        const result = await stripe.createToken(elements.getElement(CardElement), paymentInfo)
        if(result.error) {
            console.log(result.error.message)
        } else {
            fetch(CHARGES_URL, {
                method: "POST",
                headers: {  
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ token_id: result.token.id, name: paymentInfo.name })
            })
            .then(resp => resp.json())
            .then(json => console.log(json))
            .catch(err => console.error(err))
        }

    };
    
    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '3rem', width: '50%', background: '#d9d9d9', margin: '3rem auto' }}>
           <CardElement />
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    )
}