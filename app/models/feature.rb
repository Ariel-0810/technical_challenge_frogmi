class Feature < ApplicationRecord
  has_many :comments
  validates_presence_of :title, :url, :place, :mag_type, :latitude, :longitude

  validates :title, :url, :place, :mag_type, :longitude, :latitude, presence: true
  validates :magnitude, numericality: { greater_than_or_equal_to: -1.0, less_than_or_equal_to: 10.0 }
  validates :latitude, numericality: { greater_than_or_equal_to: -90.0, less_than_or_equal_to: 90.0 }
  validates :longitude, numericality: { greater_than_or_equal_to: -180.0, less_than_or_equal_to: 180.0 }

  scope :filter_by_mag_type, ->(mag_type) { where(mag_type: mag_type) if mag_type.present? }
  scope :my_paginate, ->(page, per_page) { page(page).per(per_page) }

  def self.filter(options = {})
    features = all
    features = features.filter_by_mag_type(options[:mag_type]) if options[:mag_type].present?
    features = features.my_paginate(options[:page], options[:per_page]) if options[:page].present? && options[:per_page].present?
    features
  end

  def self.create_from_geojson(geojson)
    properties = geojson['properties']
    coordinates = geojson['geometry']['coordinates']
  
    # Verificar si los valores obligatorios están presentes
    return unless properties['title'].present? && properties['url'].present? && properties['place'].present? && properties['magType'].present? && coordinates.present?
  
    # Verificar los rangos de los valores
    magnitude = properties['mag'].to_f
    latitude = coordinates[1].to_f
    longitude = coordinates[0].to_f
    return unless magnitude.between?(-1.0, 10.0) && latitude.between?(-90.0, 90.0) && longitude.between?(-180.0, 180.0)
  
    # Buscar un registro existente por su id
    feature = find_by(id: geojson['id'])
    if feature
      # Si ya existe, actualizar sus atributos
      feature.update(
        title: properties['title'],
        url: properties['url'],
        place: properties['place'],
        mag_type: properties['magType'],
        magnitude: magnitude,
        time: Time.at(properties['time'] / 1000),
        tsunami: properties['tsunami'],
        longitude: longitude,
        latitude: latitude,
        external_id: geojson['id'] # Asignar el valor de external_id igual al id del JSON
      )
    else
      # Si no existe, crear un nuevo objeto Feature
      create(
        title: properties['title'],
        url: properties['url'],
        place: properties['place'],
        mag_type: properties['magType'],
        magnitude: magnitude,
        time: Time.at(properties['time'] / 1000),
        tsunami: properties['tsunami'],
        longitude: longitude,
        latitude: latitude,
        external_id: geojson['id'] # Asignar el valor de external_id igual al id del JSON
      )
    end
  end
end


