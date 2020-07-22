class CreateMenus < ActiveRecord::Migration[6.0]
  def change
    create_table :menus do |t|
      t.string :description
      t.string :date
      t.string :pickup_location
      t.string :pickup_time
      t.string :delivery_time
      t.string :notes

      t.timestamps
    end
  end
end
