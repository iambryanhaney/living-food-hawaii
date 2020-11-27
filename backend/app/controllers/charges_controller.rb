class ChargesController < ApplicationController
    skip_before_action :authorized

    def create
        Stripe.api_key = ENV['STRIPE_SECRET_KEY']

        binding.pry

        # order = Order.find(params[:orderId])
        # amount = order.shoes.sum(:cost) * 100

    #     charge = Stripe::Charge.create(
    #         # customer: customer.id,
    #         amount: 100,
    #         description: "Some Test Shoes",
    #         currency: 'usd',
    #         source: params[:token]
    #     )

    # rescue Stripe::CardError => e
    #     render json: { message: 'Stripe had an error' }, status: :not_acceptable
    end

    private

    def charge_params
        params.require(:charge).permit(:token_id, :name)
    end

end
