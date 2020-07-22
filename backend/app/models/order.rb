class Order < ApplicationRecord
    belongs_to :user
    belongs_to :menu

    has_many :order_offerings
    has_many :orders, through: :order_offerings
end
