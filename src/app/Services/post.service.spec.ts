import {TestBed} from "@angular/core/testing";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {PostService} from "./post.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {PostDTO} from "../Models/post.dto";


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

const deleteResponse = { affected: 1 };
const updateResponse = { affected: 1 };

describe('Test service: PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('GET method and getPosts: return a list of posts', () => {
    service.getPosts().subscribe((resp: PostDTO[]) => {
      expect(resp).toEqual(listPostMock);
    });

    const req = httpMock.expectOne(`http://localhost:3000/posts`);
    expect(req.request.method).toBe('GET');
    req.flush(listPostMock);
  });

  it('GET method and getPostsByUserId: return a list of posts by UserId', () => {
    service.getPostsByUserId('1').subscribe((resp: PostDTO[]) => {
      expect(resp).toEqual(listPostMock);
    });

    const req = httpMock.expectOne(`http://localhost:3000/users/posts/1`);
    expect(req.request.method).toBe('GET');
    req.flush(listPostMock);
  });

  it('POST method and createPost: return the new post', () => {
    service.createPost(postMock).subscribe((resp: PostDTO) => {
      expect(resp).toEqual(postMock);
    });

    const req = httpMock.expectOne(`http://localhost:3000/posts`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(postMock);
    req.flush(postMock);
  });

  it('GET method and getPostById: return a post', () => {
    service.getPostById('1').subscribe((resp: PostDTO) => {
      expect(resp).toEqual(postMock);
    });

    const req = httpMock.expectOne(`http://localhost:3000/posts/1`);
    expect(req.request.method).toBe('GET');
    req.flush(postMock);
  });

  it('PUT method and getPostById: return the post updated', () => {
    service.updatePost('1', postMock).subscribe((resp) => {
      expect(resp).toEqual(postMock);
    });

    const req = httpMock.expectOne(`http://localhost:3000/posts/1`)
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(postMock);
    req.flush(postMock);
  });

  it('PUT method and like: return likes of posts updates', () => {
    service.likePost('1').subscribe((resp) => {
      expect(resp).toBeGreaterThanOrEqual(updateResponse.affected);
    });

    const req = httpMock.expectOne(`http://localhost:3000/posts/like/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(1);
  });

  it('PUT method and dislike: return dislikes of posts updates', () => {
    service.dislikePost('1').subscribe((resp) => {
      expect(resp).toBeGreaterThanOrEqual(updateResponse.affected);
    });

    const req = httpMock.expectOne(`http://localhost:3000/posts/dislike/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(1);
  });

  it('DELETE method and deleteCategory: return the DELETE RESPONSE', () => {
    service.deletePost('1').subscribe((resp) => {
      expect(resp).toBeGreaterThanOrEqual(deleteResponse.affected);
    });

    const req = httpMock.expectOne(`http://localhost:3000/posts/1`)
    expect(req.request.method).toBe('DELETE');
    req.flush(1);
  });
});
