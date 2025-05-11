import {ComponentFixture, TestBed} from "@angular/core/testing";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CategoriesListComponent} from "./categories-list.component";
import {CategoryService} from "../../../Services/category.service";
import {of} from "rxjs";
import {CategoryDTO} from "../../../Models/category.dto";
import {LocalStorageService} from "../../../Services/local-storage.service";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";

const categoryMock: CategoryDTO = {
  userId: '1',
  categoryId: '4',
  css_color: '#FF00F0',
  description: 'TEST CATEGORY',
  title: 'TEST CATEGORY'
}

const listCategoriesMock: CategoryDTO[] = [categoryMock];

class TemporalComponentForRoutes {
}

describe('Test rutes: CategoriesListComponent', () => {
  let component: CategoriesListComponent;
  let fixture: ComponentFixture<CategoriesListComponent>;
  let mockLocalStorageService: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    //Hem de instanciar el mock de LocalStorageService aqui per poder ferne us, si el fem mes endevant... se instanciara un altre LocalStorageService i tindrem errors
    mockLocalStorageService = jasmine.createSpyObj('LocalStorageService', ['get']);
    mockLocalStorageService.get.and.returnValue('1');

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([{path: 'user/category', component: TemporalComponentForRoutes}])],
      declarations: [CategoriesListComponent],
      providers: [
        CategoryService,
        {provide: LocalStorageService, useValue: mockLocalStorageService},
        Router
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loadCategories succcess from subscription with localstorage', () => {
    expect(mockLocalStorageService.get).toHaveBeenCalledWith('user_id');
    const categoriService = fixture.debugElement.injector.get(CategoryService);
    const spy = spyOn(categoriService, 'getCategoriesByUserId').and.returnValue(of(listCategoriesMock));

    component['loadCategories']();

    expect(spy).toHaveBeenCalled();
    expect(component.categories).toEqual(listCategoriesMock);
  });

  it('createCategory should navigateByUrl to /user/category/', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigateByUrl');
    component.createCategory();
    expect(spy).toHaveBeenCalledWith('/user/category/');
  });

  it('updateCategory should navigateByUrl to /user/category/1', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigateByUrl');
    component.updateCategory('1');
    expect(spy).toHaveBeenCalledWith('/user/category/1');
  });

});
