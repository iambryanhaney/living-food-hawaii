class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.boolean :pickup_delivery, default: 0
      t.string :notes
      t.boolean :is_open, default: true
      t.integer :user_id
      t.integer :menu_id

      t.timestamps
    end
  end
end
