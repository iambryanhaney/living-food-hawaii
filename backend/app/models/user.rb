class User < ApplicationRecord
    has_many :orders
    has_secure_password

    validates :email, presence: true, uniqueness: true
    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :password, presence: true, length: {minimum: 6}
end
