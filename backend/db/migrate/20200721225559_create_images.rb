class CreateImages < ActiveRecord::Migration[6.0]
  def change
    create_table :images do |t|
      t.string :path
      t.integer :dish_id

      t.timestamps
    end
  end
end
