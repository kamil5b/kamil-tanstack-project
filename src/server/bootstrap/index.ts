import { InMemoryProductRepository } from "../repository/inmemory/product.repository";
import { InMemoryTagRepository } from "../repository/inmemory/tag.repository";
import { createProductService } from "../service/product.service";
import { createTagService } from "../service/tag.service";


export const initInjection = () => {
    const productRepo = InMemoryProductRepository;
    const tagRepo = InMemoryTagRepository;

    const productSvc = createProductService(productRepo);
    const tagSvc = createTagService(tagRepo);
    return {
        productSvc,
        tagSvc,
    };
}