module Api
  module V1
    class CommentsController < ApplicationController
      before_action :set_feature

      # POST /api/v1/features/:feature_id/comments
      def create
        @comment = @feature.comments.new(comment_params)
        if @comment.save
          render json: @comment, status: :created
        else
          render json: @comment.errors, status: :unprocessable_entity
        end
      end

      private

      # Find the associated feature
      def set_feature
        @feature = Feature.find(params[:feature_id])
      end

      # Only allow a trusted parameter "white list" through
      def comment_params
        params.require(:comment).permit(:body, :feature_id)
      end      
    end
  end
end
