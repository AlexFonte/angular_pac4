import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {PostDTO} from 'src/app/Models/post.dto';
import {PostService} from 'src/app/Services/post.service';
import {HomeComponent} from './home.component';

describe('Test component: HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

      declarations: [HomeComponent],

      providers: [PostService],

      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loadPosts succcess from subscription', () => {
    const postService = fixture.debugElement.injector.get(PostService);
    const listPosts: PostDTO[] = [];
    const spy = spyOn(postService, 'getPosts').and.returnValue(of(listPosts));
    component['loadPosts']();
    expect(spy).toHaveBeenCalled();
    expect(component.posts).toEqual(listPosts);
    expect(component.posts.length).toBe(0);
  });
});
