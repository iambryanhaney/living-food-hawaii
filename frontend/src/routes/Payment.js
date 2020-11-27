import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import PaymentForm from '../components/PaymentForm'

const stripePromise = loadStripe('pk_test_51HralTDHXgOCKDlSbp7gBm3dumCua6B0juRqWCKnbI3zLS3niKqokMBsRsyH1miNdwwo4JPQ6r33UQr4CguASxUE00h2ctdCOU')

export default function Payment() {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Payment Test</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non dignissimos sit et libero rem, molestiae nam iste beatae voluptatem velit quisquam, fugit atque facilis! Porro, corrupti dicta? Illum eos sunt dicta sapiente neque laboriosam suscipit recusandae accusantium, at, facilis molestiae eveniet? Amet fuga expedita delectus illo, deserunt possimus! Rerum, expedita?</p>
            <Elements stripe={stripePromise}>
                <PaymentForm />
            </Elements>
        </div>
    )
}