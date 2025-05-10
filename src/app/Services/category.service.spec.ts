import {TestBed} from "@angular/core/testing";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {CategoryDTO} from "../Models/category.dto";
import {CategoryService, deleteResponse} from "./category.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

const categoriesListMock: CategoryDTO[] = [
  {userId: '', categoryId: '1', css_color: '', description: '', title: ''},
  {userId: '', categoryId: '2', css_color: '', description: '', title: ''},
  {userId: '', categoryId: '3', css_color: '', description: '', title: ''},
];

const categoryMock: CategoryDTO = {
  userId: '1',
  categoryId: '4',
  css_color: '#FF00F0',
  description: 'TEST CATEGORY',
  title: 'TEST CATEGORY'
}

const deleteResponse = { affected: 1 };


describe('Test service: CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('GET method and getCagoriesByUserId: return a list of categories', () => {
    service.getCategoriesByUserId('1').subscribe((resp: CategoryDTO[]) => {
      expect(resp).toEqual(categoriesListMock);
    });

    const req = httpMock.expectOne(`http://localhost:3000/users/categories/1`);
    expect(req.request.method).toBe('GET');
    req.flush(categoriesListMock);
  });

  it('POST method and createCategory: return the new category', () => {
    service.createCategory(categoryMock).subscribe((category) => {
      expect(category).toEqual(categoryMock);
    });

    const req = httpMock.expectOne(`http://localhost:3000/categories`)
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(categoryMock);
    req.flush(categoryMock);
  });

  it('GET method and getCategoryById: return a category', () => {
    service.getCategoryById('1').subscribe((resp: CategoryDTO) => {
      expect(resp).toEqual(categoriesListMock[0]);
    });
    const req = httpMock.expectOne(`http://localhost:3000/categories/1`);
    expect(req.request.method).toBe('GET');
    req.flush(categoriesListMock[0]);
  });

  it('PUT method and updateCategory: return the category updated', () => {
    service.updateCategory('4', categoryMock).subscribe((category) => {
      expect(category).toEqual(categoryMock);
    });

    const req = httpMock.expectOne(`http://localhost:3000/categories/4`)
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(categoryMock);
    req.flush(categoryMock);
  });

  it('DELETE method and deleteCategory: return the DELETE RESPONSE', () => {
    service.deleteCategory('4').subscribe((resp) => {
      expect(resp).toBeGreaterThanOrEqual(deleteResponse.affected);
    });

    const req = httpMock.expectOne(`http://localhost:3000/categories/4`)
    expect(req.request.method).toBe('DELETE');
    req.flush(1);
  });

});
