import { Button } from "../ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";


const categoryList = [
    "Frontend Developer",
    "Backend Developer",
    "Graphic Designer",
    "Data Science",
    "Fullstack Developer"
]

const Category = () => {
    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-12">
                <CarouselContent>
                    {
                        categoryList?.map((cat, index) => (
                            <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={index}>
                                <Button variant='outline' className="rounded-full">{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
};

export default Category;