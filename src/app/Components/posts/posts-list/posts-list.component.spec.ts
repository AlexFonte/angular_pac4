import {ComponentFixture, TestBed} from "@angular/core/testing";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {of} from "rxjs";
import {LocalStorageService} from "../../../Services/local-storage.service";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {PostDTO} from "../../../Models/post.dto";
import {PostsListComponent} from "./posts-list.component";
import {PostService} from "../../../Services/post.service";

const postMock: PostDTO = {
    postId: '1',
    userId: '1',
    title: 'Test Post',
    description: 'Test Description',
    publication_date: new Date('2025-05-10'),
    categories: [],
    num_likes: 0,
    num_dislikes: 0,
    userAlias: 'Test User'
};

const listPostMock: PostDTO[] = [postMock];

class TemporalComponentForRoutes {
}

describe('Test rutes: PostsListComponent', () => {
    let component: PostsListComponent;
    let fixture: ComponentFixture<PostsListComponent>;
    let mockLocalStorageService: jasmine.SpyObj<LocalStorageService>;

    beforeEach(() => {
        //Hem de instanciar el mock de LocalStorageService aqui per poder ferne us, si el fem mes endevant... se instanciara un altre LocalStorageService i tindrem errors
        mockLocalStorageService = jasmine.createSpyObj('LocalStorageService', ['get']);
        mockLocalStorageService.get.and.returnValue('1');

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([{
                path: 'user/post    /',
                component: TemporalComponentForRoutes
            }])],
            declarations: [PostsListComponent],
            providers: [
                PostService,
                {provide: LocalStorageService, useValue: mockLocalStorageService},
                Router
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PostsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('loadPosts succcess from subscription with localstorage', () => {
        expect(mockLocalStorageService.get).toHaveBeenCalledWith('user_id');
        const postService = fixture.debugElement.injector.get(PostService);
        const spy = spyOn(postService, 'getPostsByUserId').and.returnValue(of(listPostMock));

        component['loadPosts']();

        expect(spy).toHaveBeenCalled();
        expect(component.posts).toEqual(listPostMock);
    });

    it('createPost should navigateByUrl to /user/post/', () => {
        const router = TestBed.inject(Router);
        const spy = spyOn(router, 'navigateByUrl');
        component.createPost();
        expect(spy).toHaveBeenCalledWith('/user/post/');
    });

    it('updatePost should navigateByUrl to /user/post/1', () => {
        const router = TestBed.inject(Router);
        const spy = spyOn(router, 'navigateByUrl');
        component.updatePost('1');
        expect(spy).toHaveBeenCalledWith('/user/post/1');
    });

});
