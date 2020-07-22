class CreateOfferings < ActiveRecord::Migration[6.0]
  def change
    create_table :offerings do |t|
      t.string :description
      t.float :price
      t.integer :menu_id

      t.timestamps
    end
  end
end
