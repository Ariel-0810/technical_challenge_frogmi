class CreateFeatures < ActiveRecord::Migration[7.1]
  def change
    create_table :features do |t|
      t.string :title
      t.string :url
      t.string :place
      t.float :magnitude
      t.float :latitude
      t.float :longitude
      t.string :mag_type
      t.boolean :tsunami
      t.datetime :time

      t.timestamps
    end
  end
end

