class DishesController < ApplicationController
    include Rails.application.routes.url_helpers    
    

    #             ### ActiveStorage Variants
    # def index
    #     dishes = Dish.with_attached_images.map do |dish|
    #         dish.as_json(except: [:created_at, :updated_at]).merge({ images: dish.images.map do |image|
    #                 {
    #                     blob_id: image.blob_id,
    #                     sm_url: "#{self.request.base_url}#{rails_representation_path(image.variant(resize_to_limit: [80, 80]).processed, only_path: true)}",
    #                     md_url: "#{self.request.base_url}#{rails_representation_path(image.variant(resize_to_limit: [400, 400]).processed, only_path: true)}",
    #                     lg_url: "#{self.request.base_url}#{rails_blob_path(image, only_path: true)}",
    #                     # sm_url: image.variant(resize_to_limit: [80, 80]).processed.service_url,
    #                     # md_url: image.variant(resize_to_limit: [400, 400]).processed.service_url,
    #                     # lg_url: image.service_url,
    #                 }
    #             end
    #         })    
    #     end
    #     render json: dishes
    # end


                ### CloudFront variants
    def index
        dishes = Dish.with_attached_images.map do |dish|
            dish.as_json(except: [:created_at, :updated_at]).merge({ images: dish.images.map do |image|
                {
                    id: image.id,
                    bucket: BUCKET,
                    key: image.blob.key,
                    base_url: IMAGE_BASE_URL,
                }
            end
            })
        end
        render json: dishes
    end




    def create
        # binding.pry
        dish = Dish.create(dish_params)
        render json: {
            dish_id: dish.id,
            status: 201
        }
        # render json: { message: "Returning from create" }
    end

    
    private


    def dish_params
        params.require(:dish).permit(:description, tag_ids: [], images: [])
    end

end


=begin

<% @post.images.each do |image| %>
  <% image_width = image.metadata['width'] %>
  <% for scale in (10..100).step(10) do %>
    <% request = Base64.encode64({
      bucket: "living-food-hawaii",
      key: 'nz0gxud00loa8fz1bhzowhkqim6z',
      edits: {
          resize: {
              width: (image_width * (scale / 100.0)).to_i,
              fit: "cover"
          }
      }
    }.to_json) %>
  
    <%= image_tag("#{cloudfront_url}/#{request}") %>






    # Image paths
Rails.application.routes.url_helpers.rails_blob_path(Dish.first.images[0], only_path: true)


    # Variant paths
 Rails.application.routes.url_helpers.rails_representation_path(Dish.first.images[0].variant(resize_to_limit: [150, 150]).processed, only_path: true)









dish = Dish.create(description: 'Lentil & Vegetable Fritters served with Quinoa & Seared Bok Choy')
dish.tags << [
    Tag.where(name: 'breakfast'),
    Tag.where(name: 'lunch'),
    Tag.where(name: 'entrees'),
    Tag.where(name: 'vegan'),
    Tag.where(name: 'vegetarian'),
    Tag.where(name: 'gluten free'),
    Tag.where(name: 'private parties'),
    Tag.where(name: 'plated')
]
images = [
    { io: File.open('./stor_uploads/dish_001.jpg'), filename: 'dish_001.jpg' },
    { io: File.open('./stor_uploads/dish_002.jpg'), filename: 'dish_002.jpg' }
]
dish.images.attach(images)

=end
