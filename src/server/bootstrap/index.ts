import { InMemoryAuthRepository } from "../repository/inmemory/auth.repository";
import { InMemoryProductRepository } from "../repository/inmemory/product.repository";
import { InMemoryTagRepository } from "../repository/inmemory/tag.repository";
import { createAuthService } from "../service/auth.service";
import { createProductService } from "../service/product.service";
import { createTagService } from "../service/tag.service";

export const injectProductService = () => {
  const productRepo = InMemoryProductRepository;
  return createProductService(productRepo);
};

export const injectTagService = () => {
  const tagRepo = InMemoryTagRepository;
  return createTagService(tagRepo);
};

export const injectAuthService = () => {
  const authRepo = InMemoryAuthRepository;
  return createAuthService(authRepo);
}

export const initInjection = () => {
  return {
    productSvc: injectProductService(),
    tagSvc: injectTagService(),
    authSvc: injectAuthService(),
  };
};
