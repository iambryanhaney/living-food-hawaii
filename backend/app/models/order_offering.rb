class OrderOffering < ApplicationRecord
    belongs_to :order
    belongs_to :offering
end
