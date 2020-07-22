class CreateTags < ActiveRecord::Migration[6.0]
  def change
    create_table :tags do |t|
      t.string :group
      t.string :name

      t.timestamps
    end
  end
end
