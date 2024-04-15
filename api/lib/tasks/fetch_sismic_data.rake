require 'net/http'

namespace :fetch_sismic_data do
  desc "Obtain sismic data from USGS and persist it"
  task :perform => :environment do
    url = URI("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson")
    response = Net::HTTP.get(url)
    data = JSON.parse(response)

    data['features'].each do |feature|
      Feature.create_from_geojson(feature)
    end
  end
end
