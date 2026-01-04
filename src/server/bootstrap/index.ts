import { InMemoryAuthRepository } from "../repository/inmemory/auth.repository";
import { InMemoryProductRepository } from "../repository/inmemory/product.repository";
import { InMemoryTagRepository } from "../repository/inmemory/tag.repository";
import { createAuthService } from "../service/auth.service";
import { createProductService } from "../service/product.service";
import { createTagService } from "../service/tag.service";
import { AuthService } from "../interfaces/auth.interface";
import { ProductService } from "../interfaces/product.interface";
import { TagService } from "../interfaces/tag.interface";

var authInstance: AuthService | null = null;
var productInstance: ProductService | null = null;
var tagInstance: TagService | null = null;

export const injectProductService = () => {
  if(productInstance) {
    return productInstance;
  }
  const productRepo = InMemoryProductRepository;
  productInstance = createProductService(productRepo);
  return productInstance;
};

export const injectTagService = () => {
  if(tagInstance) {
    return tagInstance;
  }
  const tagRepo = InMemoryTagRepository;
  tagInstance = createTagService(tagRepo);
  return tagInstance;
};

export const injectAuthService = () => {
  if(authInstance) {
    return authInstance;
  }
  const authRepo = InMemoryAuthRepository;
  authInstance = createAuthService(authRepo);
  return authInstance;
}

export const initInjection = () => {
  return {
    productSvc: injectProductService(),
    tagSvc: injectTagService(),
    authSvc: injectAuthService(),
  };
};
