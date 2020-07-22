class Menu < ApplicationRecord
    has_many :offerings
    has_many :orders
end
