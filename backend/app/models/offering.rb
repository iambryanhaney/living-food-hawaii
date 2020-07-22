class Offering < ApplicationRecord
    belongs_to :menu
    has_many :order_offerings
end
