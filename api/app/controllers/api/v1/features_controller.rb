# feature_controller.rb
module Api
  module V1
    class FeaturesController < ApplicationController
      def index
        page = params[:page] || 1
        per_page = params[:per_page] || 10
        @features = Feature.filter(params.permit(:mag_type)).includes(:comments).paginate(page: page, per_page: per_page)
        render json: {
          data: @features.map { |feature| format_feature(feature) }
        }
      end

      def show
        @feature = Feature.find(params[:id])
        @comments = @feature.comments
        render json: @feature, include: :comments
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Feature not found' }, status: :not_found
      end
    
      private
    
      def format_feature(feature)
        {
          id: feature.id,
          type: 'feature',
          attributes: {
            external_id: feature.id,
            magnitude: feature.magnitude,
            place: feature.place,
            time: feature.time.to_s,
            tsunami: feature.tsunami,
            mag_type: feature.mag_type,
            title: feature.title,
            coordinates: {
              longitude: feature.longitude,
              latitude: feature.latitude
            },
            comments: feature.comments.map { |comment| format_comment(comment) }
          },
          links: {
            external_url: feature.url
          }
        }
      end
    
      def format_comment(comment)
        {
          id: comment.id,
          body: comment.body,
          created_at: comment.created_at,
          updated_at: comment.updated_at
        }
      end
    end  
  end
end
