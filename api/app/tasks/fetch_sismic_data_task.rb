require 'net/http'

class FetchSismicDataTask
  def perform
    url = URI("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson")
    response = Net::HTTP.get(url)
    data = JSON.parse(response)

    puts "Starting data retrieval..."
    data['features'].each do |feature|
      puts "Creating feature from GeoJSON: #{feature}"
      Feature.create_from_geojson(feature)
    end
    puts "Data retrieval completed."
  end
end

