import { Injectable } from "@angular/core";
import { Query } from "apollo-angular";
// import gql from "graphql-tag";
import { gql } from "graphql";

export interface Post {
  id: string;
  title: string;
  votes: number;
  author: {
    id: string;
    firstName: string;
    lastName: string;
  };
}
export interface Response {
  posts: Post[];
}

@Injectable({
  providedIn: "root"
})
export class BasicService extends Query<Response> {
  document = gql`
    query allPosts {
      posts {
        id
        title
        votes
        author {
          id
          firstName
          lastName
        }
      }
    }
  `;
}
