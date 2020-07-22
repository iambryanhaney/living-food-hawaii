class CreateOrderOfferings < ActiveRecord::Migration[6.0]
  def change
    create_table :order_offerings do |t|
      t.integer :order_id
      t.integer :offering_id
      t.integer :servings

      t.timestamps
    end
  end
end
