export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.0.2 (a4e00ff)"
  }
  public: {
    Tables: {
      agent: {
        Row: {
          collection_id: string
          created_at: string
          description: string | null
          frequency_hours: number
          goal: string | null
          id: string
          name: string
          profile_id: string
          prompt: string | null
          updated_at: string
        }
        Insert: {
          collection_id: string
          created_at?: string
          description?: string | null
          frequency_hours: number
          goal?: string | null
          id?: string
          name: string
          profile_id: string
          prompt?: string | null
          updated_at?: string
        }
        Update: {
          collection_id?: string
          created_at?: string
          description?: string | null
          frequency_hours?: number
          goal?: string | null
          id?: string
          name?: string
          profile_id?: string
          prompt?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "articles_view"
            referencedColumns: ["collection_id"]
          },
          {
            foreignKeyName: "agent_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collection"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      article: {
        Row: {
          article_url: string | null
          collection_id: string
          content: string | null
          created_at: string
          id: string
          knowledge_metadata_id: string | null
          mhtml_path: string | null
          name: string | null
          profile_id: string
          send_in_summary: boolean | null
        }
        Insert: {
          article_url?: string | null
          collection_id: string
          content?: string | null
          created_at?: string
          id?: string
          knowledge_metadata_id?: string | null
          mhtml_path?: string | null
          name?: string | null
          profile_id: string
          send_in_summary?: boolean | null
        }
        Update: {
          article_url?: string | null
          collection_id?: string
          content?: string | null
          created_at?: string
          id?: string
          knowledge_metadata_id?: string | null
          mhtml_path?: string | null
          name?: string | null
          profile_id?: string
          send_in_summary?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "article_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "articles_view"
            referencedColumns: ["collection_id"]
          },
          {
            foreignKeyName: "article_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collection"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_knowledge_metadata_id"
            columns: ["knowledge_metadata_id"]
            isOneToOne: false
            referencedRelation: "articles_view"
            referencedColumns: ["knowledge_metadata_id"]
          },
          {
            foreignKeyName: "fk_knowledge_metadata_id"
            columns: ["knowledge_metadata_id"]
            isOneToOne: false
            referencedRelation: "knowledge_metadata"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_knowledge_metadata_id"
            columns: ["knowledge_metadata_id"]
            isOneToOne: false
            referencedRelation: "received_emails"
            referencedColumns: ["knowledge_metadata_id"]
          },
          {
            foreignKeyName: "fk_knowledge_metadata_id"
            columns: ["knowledge_metadata_id"]
            isOneToOne: false
            referencedRelation: "user_rss_item"
            referencedColumns: ["knowledge_metadata_id"]
          },
        ]
      }
      article_summary: {
        Row: {
          article_id: string
          collection_id: string
          created_at: string | null
          id: string
          key_takeaways: Json | null
          one_minute_summary: string | null
          profile_id: string
          raw_summary: Json | null
          short_description: string | null
          summary_sent: boolean | null
          three_minute_summary: string | null
        }
        Insert: {
          article_id: string
          collection_id: string
          created_at?: string | null
          id?: string
          key_takeaways?: Json | null
          one_minute_summary?: string | null
          profile_id: string
          raw_summary?: Json | null
          short_description?: string | null
          summary_sent?: boolean | null
          three_minute_summary?: string | null
        }
        Update: {
          article_id?: string
          collection_id?: string
          created_at?: string | null
          id?: string
          key_takeaways?: Json | null
          one_minute_summary?: string | null
          profile_id?: string
          raw_summary?: Json | null
          short_description?: string | null
          summary_sent?: boolean | null
          three_minute_summary?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "article_summary_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "article"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_summary_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_summary_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles_with_summaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_summary_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "articles_view"
            referencedColumns: ["collection_id"]
          },
          {
            foreignKeyName: "article_summary_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collection"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_summary_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      collection: {
        Row: {
          default_collection: boolean
          default_set_nestornotes_email: string | null
          description: string | null
          id: string
          name: string
          nestornotes_email: string
          profile_id: string
          schedule_day: number | null
          schedule_time: number | null
          schedule_timezone: string
          schedule_type: Database["public"]["Enums"]["schedule_type"]
          send_email_summaries: boolean
          slug: string | null
        }
        Insert: {
          default_collection?: boolean
          default_set_nestornotes_email?: string | null
          description?: string | null
          id?: string
          name: string
          nestornotes_email: string
          profile_id: string
          schedule_day?: number | null
          schedule_time?: number | null
          schedule_timezone?: string
          schedule_type?: Database["public"]["Enums"]["schedule_type"]
          send_email_summaries?: boolean
          slug?: string | null
        }
        Update: {
          default_collection?: boolean
          default_set_nestornotes_email?: string | null
          description?: string | null
          id?: string
          name?: string
          nestornotes_email?: string
          profile_id?: string
          schedule_day?: number | null
          schedule_time?: number | null
          schedule_timezone?: string
          schedule_type?: Database["public"]["Enums"]["schedule_type"]
          send_email_summaries?: boolean
          slug?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "collection_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      collection_newsletter_subscription: {
        Row: {
          collection_id: string
          id: string
          newsletter_id: string
          profile_id: string
          task_id: string | null
          task_status: string | null
        }
        Insert: {
          collection_id: string
          id?: string
          newsletter_id: string
          profile_id: string
          task_id?: string | null
          task_status?: string | null
        }
        Update: {
          collection_id?: string
          id?: string
          newsletter_id?: string
          profile_id?: string
          task_id?: string | null
          task_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "collection_newsletter_subscription_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "articles_view"
            referencedColumns: ["collection_id"]
          },
          {
            foreignKeyName: "collection_newsletter_subscription_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collection"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_newsletter_subscription_newsletter_id_fkey"
            columns: ["newsletter_id"]
            isOneToOne: false
            referencedRelation: "newsletter"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_newsletter_subscription_newsletter_id_fkey"
            columns: ["newsletter_id"]
            isOneToOne: false
            referencedRelation: "similar_newsletters"
            referencedColumns: ["newsletter_id"]
          },
          {
            foreignKeyName: "collection_newsletter_subscription_newsletter_id_fkey"
            columns: ["newsletter_id"]
            isOneToOne: false
            referencedRelation: "similar_newsletters"
            referencedColumns: ["similar_newsletter_id"]
          },
          {
            foreignKeyName: "collection_newsletter_subscription_newsletter_id_fkey"
            columns: ["newsletter_id"]
            isOneToOne: false
            referencedRelation: "spotlight_newsletters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collection_newsletter_subscription_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation: {
        Row: {
          collection_id: string | null
          created_at: string
          id: string
          title: string | null
          user_id: string
        }
        Insert: {
          collection_id?: string | null
          created_at?: string
          id?: string
          title?: string | null
          user_id: string
        }
        Update: {
          collection_id?: string | null
          created_at?: string
          id?: string
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_collection_fk_collection_id"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "articles_view"
            referencedColumns: ["collection_id"]
          },
          {
            foreignKeyName: "conversation_collection_fk_collection_id"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collection"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_messages: {
        Row: {
          conversation_id: string | null
          created_at: string
          entry: string | null
          id: string
          speaker: Database["public"]["Enums"]["speaker"]
          user_id: string
        }
        Insert: {
          conversation_id?: string | null
          created_at?: string
          entry?: string | null
          id?: string
          speaker: Database["public"]["Enums"]["speaker"]
          user_id: string
        }
        Update: {
          conversation_id?: string | null
          created_at?: string
          entry?: string | null
          id?: string
          speaker?: Database["public"]["Enums"]["speaker"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversation"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          id: string
          stripe_customer_id: string | null
        }
        Insert: {
          id: string
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          stripe_customer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      digest_settings: {
        Row: {
          collection_id: string
          id: string
          show_intro_summary: boolean
          show_short_description: boolean
          show_takeaway_description: boolean
          summary_type: Database["public"]["Enums"]["digest_summary_type"]
        }
        Insert: {
          collection_id: string
          id?: string
          show_intro_summary?: boolean
          show_short_description?: boolean
          show_takeaway_description?: boolean
          summary_type?: Database["public"]["Enums"]["digest_summary_type"]
        }
        Update: {
          collection_id?: string
          id?: string
          show_intro_summary?: boolean
          show_short_description?: boolean
          show_takeaway_description?: boolean
          summary_type?: Database["public"]["Enums"]["digest_summary_type"]
        }
        Relationships: [
          {
            foreignKeyName: "digest_settings_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: true
            referencedRelation: "articles_view"
            referencedColumns: ["collection_id"]
          },
          {
            foreignKeyName: "digest_settings_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: true
            referencedRelation: "collection"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          knowledge_metadata_id: string | null
          metadata: Json | null
          user_id: string
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          knowledge_metadata_id?: string | null
          metadata?: Json | null
          user_id: string
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          knowledge_metadata_id?: string | null
          metadata?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_knowledge_metadata_id"
            columns: ["knowledge_metadata_id"]
            isOneToOne: false
            referencedRelation: "articles_view"
            referencedColumns: ["knowledge_metadata_id"]
          },
          {
            foreignKeyName: "fk_knowledge_metadata_id"
            columns: ["knowledge_metadata_id"]
            isOneToOne: false
            referencedRelation: "knowledge_metadata"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_knowledge_metadata_id"
            columns: ["knowledge_metadata_id"]
            isOneToOne: false
            referencedRelation: "received_emails"
            referencedColumns: ["knowledge_metadata_id"]
          },
          {
            foreignKeyName: "fk_knowledge_metadata_id"
            columns: ["knowledge_metadata_id"]
            isOneToOne: false
            referencedRelation: "user_rss_item"
            referencedColumns: ["knowledge_metadata_id"]
          },
        ]
      }
      email_domain: {
        Row: {
          domain: string | null
          id: string
        }
        Insert: {
          domain?: string | null
          id?: string
        }
        Update: {
          domain?: string | null
          id?: string
        }
        Relationships: []
      }
      email_summary: {
        Row: {
          collection_id: string | null
          created_at: string | null
          email_id: string | null
          id: string
          key_takeaways: Json | null
          one_minute_summary: string | null
          profile_id: string | null
          raw_summary: Json | null
          short_description: string | null
          summary_sent: boolean | null
          three_minute_summary: string | null
        }
        Insert: {
          collection_id?: string | null
          created_at?: string | null
          email_id?: string | null
          id?: string
          key_takeaways?: Json | null
          one_minute_summary?: string | null
          profile_id?: string | null
          raw_summary?: Json | null
          short_description?: string | null
          summary_sent?: boolean | null
          three_minute_summary?: string | null
        }
        Update: {
          collection_id?: string | null
          created_at?: string | null
          email_id?: string | null
          id?: string
          key_takeaways?: Json | null
          one_minute_summary?: string | null
          profile_id?: string | null
          raw_summary?: Json | null
          short_description?: string | null
          summary_sent?: boolean | null
          three_minute_summary?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_summary_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "articles_view"
            referencedColumns: ["collection_id"]
          },
          {
            foreignKeyName: "email_summary_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collection"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_summary_email_id_fkey"
            columns: ["email_id"]
            isOneToOne: false
            referencedRelation: "incoming_emails"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_summary_email_id_fkey"
            columns: ["email_id"]
            isOneToOne: false
            referencedRelation: "received_emails"
            referencedColumns: ["incoming_email_id"]
          },
          {
            foreignKeyName: "email_summary_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      incoming_email_metadata: {
        Row: {
          id: string
          seen: boolean
        }
        Insert: {
          id: string
          seen?: boolean
        }
        Update: {
          id?: string
          seen?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "incoming_email_metadata_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "incoming_emails"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incoming_email_metadata_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "received_emails"
            referencedColumns: ["incoming_email_id"]
          },
        ]
      }
      incoming_emails: {
        Row: {
          collection_id: string | null
          created_at: string | null
          from: string | null
          full_message: Json
          headers_from: string | null
          html_email: string | null
          id: string
          knowledge_metadata_id: string | null
          message_id: string
          profile_id: string | null
          subject: string | null
          to: string
        }
        Insert: {
          collection_id?: string | null
          created_at?: string | null
          from?: string | null
          full_message: Json
          headers_from?: string | null
          html_email?: string | null
          id?: string
          knowledge_metadata_id?: string | null
          message_id: string
          profile_id?: string | null
          subject?: string | null
          to: string
        }
        Update: {
          collection_id?: string | null
          created_at?: string | null
          from?: string | null
          full_message?: Json
          headers_from?: string | null
          html_email?: string | null
          id?: string
          knowledge_metadata_id?: string | null
          message_id?: string
          profile_id?: string | null
          subject?: string | null
          to?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_knowledge_metadata_id"
            columns: ["knowledge_metadata_id"]
            isOneToOne: false
            referencedRelation: "articles_view"
            referencedColumns: ["knowledge_metadata_id"]
          },
          {
            foreignKeyName: "fk_knowledge_metadata_id"
            columns: ["knowledge_metadata_id"]
            isOneToOne: false
            referencedRelation: "knowledge_metadata"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_knowledge_metadata_id"
            columns: ["knowledge_metadata_id"]
            isOneToOne: false
            referencedRelation: "received_emails"
            referencedColumns: ["knowledge_metadata_id"]
          },
          {
            foreignKeyName: "fk_knowledge_metadata_id"
            columns: ["knowledge_metadata_id"]
            isOneToOne: false
            referencedRelation: "user_rss_item"
            referencedColumns: ["knowledge_metadata_id"]
          },
          {
            foreignKeyName: "incoming_emails_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "articles_view"
            referencedColumns: ["collection_id"]
          },
          {
            foreignKeyName: "incoming_emails_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collection"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incoming_emails_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      invitation_codes: {
        Row: {
          code_used: boolean | null
          created_at: string | null
          id: string
          invitation_code: string
          profile_id: string | null
        }
        Insert: {
          code_used?: boolean | null
          created_at?: string | null
          id?: string
          invitation_code?: string
          profile_id?: string | null
        }
        Update: {
          code_used?: boolean | null
          created_at?: string | null
          id?: string
          invitation_code?: string
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invitation_codes_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      knowledge_metadata: {
        Row: {
          archived: boolean | null
          bookmarked: boolean | null
          collection_id: string
          created_at: string | null
          id: string
          include_in_digest: boolean | null
          object_id: string
          object_table: string
          profile_id: string
          seen: boolean | null
          sent_in_digest: boolean | null
          stored_in_documents: boolean | null
          summarized: boolean | null
          updated_at: string | null
        }
        Insert: {
          archived?: boolean | null
          bookmarked?: boolean | null
          collection_id: string
          created_at?: string | null
          id?: string
          include_in_digest?: boolean | null
          object_id: string
          object_table: string
          profile_id: string
          seen?: boolean | null
          sent_in_digest?: boolean | null
          stored_in_documents?: boolean | null
          summarized?: boolean | null
          updated_at?: string | null
        }
        Update: {
          archived?: boolean | null
          bookmarked?: boolean | null
          collection_id?: string
          created_at?: string | null
          id?: string
          include_in_digest?: boolean | null
          object_id?: string
          object_table?: string
          profile_id?: string
          seen?: boolean | null
          sent_in_digest?: boolean | null
          stored_in_documents?: boolean | null
          summarized?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "knowledge_metadata_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "articles_view"
            referencedColumns: ["collection_id"]
          },
          {
            foreignKeyName: "knowledge_metadata_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collection"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "knowledge_metadata_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      knowledge_metadata_metadata_tag: {
        Row: {
          id: string
          knowledge_metadata_id: string | null
          metadata_tag_id: string | null
          profile_id: string
        }
        Insert: {
          id?: string
          knowledge_metadata_id?: string | null
          metadata_tag_id?: string | null
          profile_id: string
        }
        Update: {
          id?: string
          knowledge_metadata_id?: string | null
          metadata_tag_id?: string | null
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "knowledge_metadata_metadata_tag_knowledge_metadata_id_fkey"
            columns: ["knowledge_metadata_id"]
            isOneToOne: false
            referencedRelation: "articles_view"
            referencedColumns: ["knowledge_metadata_id"]
          },
          {
            foreignKeyName: "knowledge_metadata_metadata_tag_knowledge_metadata_id_fkey"
            columns: ["knowledge_metadata_id"]
            isOneToOne: false
            referencedRelation: "knowledge_metadata"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "knowledge_metadata_metadata_tag_knowledge_metadata_id_fkey"
            columns: ["knowledge_metadata_id"]
            isOneToOne: false
            referencedRelation: "received_emails"
            referencedColumns: ["knowledge_metadata_id"]
          },
          {
            foreignKeyName: "knowledge_metadata_metadata_tag_knowledge_metadata_id_fkey"
            columns: ["knowledge_metadata_id"]
            isOneToOne: false
            referencedRelation: "user_rss_item"
            referencedColumns: ["knowledge_metadata_id"]
          },
          {
            foreignKeyName: "knowledge_metadata_metadata_tag_metadata_tag_id_fkey"
            columns: ["metadata_tag_id"]
            isOneToOne: false
            referencedRelation: "metadata_tag"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "knowledge_metadata_metadata_tag_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      metadata_tag: {
        Row: {
          color: string | null
          id: string
          name: string | null
          profile_id: string
        }
        Insert: {
          color?: string | null
          id?: string
          name?: string | null
          profile_id: string
        }
        Update: {
          color?: string | null
          id?: string
          name?: string | null
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "metadata_tag_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter: {
        Row: {
          archive_url: string | null
          created_at: string | null
          description: string
          description_embedding: string | null
          id: string
          language_id: string | null
          name: string
          newsletter_image_url: string | null
          newsletter_url: string
          rate_id: string | null
          sample_url: string | null
          slug: string
          tagline: string
          topic_id: string | null
        }
        Insert: {
          archive_url?: string | null
          created_at?: string | null
          description: string
          description_embedding?: string | null
          id?: string
          language_id?: string | null
          name: string
          newsletter_image_url?: string | null
          newsletter_url: string
          rate_id?: string | null
          sample_url?: string | null
          slug: string
          tagline: string
          topic_id?: string | null
        }
        Update: {
          archive_url?: string | null
          created_at?: string | null
          description?: string
          description_embedding?: string | null
          id?: string
          language_id?: string | null
          name?: string
          newsletter_image_url?: string | null
          newsletter_url?: string
          rate_id?: string | null
          sample_url?: string | null
          slug?: string
          tagline?: string
          topic_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "newsletter_language_id_fkey"
            columns: ["language_id"]
            isOneToOne: false
            referencedRelation: "newsletter_language"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "newsletter_rate_id_fkey"
            columns: ["rate_id"]
            isOneToOne: false
            referencedRelation: "newsletter_rate"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "newsletter_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "newsletter_topic"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_language: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      newsletter_newsletter_side_topic: {
        Row: {
          id: string
          newsletter_id: string | null
          side_topic_id: string | null
        }
        Insert: {
          id?: string
          newsletter_id?: string | null
          side_topic_id?: string | null
        }
        Update: {
          id?: string
          newsletter_id?: string | null
          side_topic_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "newsletter_newsletter_side_topic_newsletter_id_fkey"
            columns: ["newsletter_id"]
            isOneToOne: false
            referencedRelation: "newsletter"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "newsletter_newsletter_side_topic_newsletter_id_fkey"
            columns: ["newsletter_id"]
            isOneToOne: false
            referencedRelation: "similar_newsletters"
            referencedColumns: ["newsletter_id"]
          },
          {
            foreignKeyName: "newsletter_newsletter_side_topic_newsletter_id_fkey"
            columns: ["newsletter_id"]
            isOneToOne: false
            referencedRelation: "similar_newsletters"
            referencedColumns: ["similar_newsletter_id"]
          },
          {
            foreignKeyName: "newsletter_newsletter_side_topic_newsletter_id_fkey"
            columns: ["newsletter_id"]
            isOneToOne: false
            referencedRelation: "spotlight_newsletters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "newsletter_newsletter_side_topic_side_topic_id_fkey"
            columns: ["side_topic_id"]
            isOneToOne: false
            referencedRelation: "newsletter_side_topic"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_rate: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      newsletter_side_topic: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      newsletter_sub_log: {
        Row: {
          id: number
          newsletter_id: string | null
          profile_id: string | null
          viewed_at: string
        }
        Insert: {
          id?: number
          newsletter_id?: string | null
          profile_id?: string | null
          viewed_at?: string
        }
        Update: {
          id?: number
          newsletter_id?: string | null
          profile_id?: string | null
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "newsletter_sub_log_newsletter_id_fkey"
            columns: ["newsletter_id"]
            isOneToOne: false
            referencedRelation: "newsletter"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "newsletter_sub_log_newsletter_id_fkey"
            columns: ["newsletter_id"]
            isOneToOne: false
            referencedRelation: "similar_newsletters"
            referencedColumns: ["newsletter_id"]
          },
          {
            foreignKeyName: "newsletter_sub_log_newsletter_id_fkey"
            columns: ["newsletter_id"]
            isOneToOne: false
            referencedRelation: "similar_newsletters"
            referencedColumns: ["similar_newsletter_id"]
          },
          {
            foreignKeyName: "newsletter_sub_log_newsletter_id_fkey"
            columns: ["newsletter_id"]
            isOneToOne: false
            referencedRelation: "spotlight_newsletters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "newsletter_sub_log_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_topic: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      newsletter_view_log: {
        Row: {
          id: number
          newsletter_id: string | null
          profile_id: string | null
          viewed_at: string
        }
        Insert: {
          id?: number
          newsletter_id?: string | null
          profile_id?: string | null
          viewed_at?: string
        }
        Update: {
          id?: number
          newsletter_id?: string | null
          profile_id?: string | null
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "newsletter_view_log_newsletter_id_fkey"
            columns: ["newsletter_id"]
            isOneToOne: false
            referencedRelation: "newsletter"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "newsletter_view_log_newsletter_id_fkey"
            columns: ["newsletter_id"]
            isOneToOne: false
            referencedRelation: "similar_newsletters"
            referencedColumns: ["newsletter_id"]
          },
          {
            foreignKeyName: "newsletter_view_log_newsletter_id_fkey"
            columns: ["newsletter_id"]
            isOneToOne: false
            referencedRelation: "similar_newsletters"
            referencedColumns: ["similar_newsletter_id"]
          },
          {
            foreignKeyName: "newsletter_view_log_newsletter_id_fkey"
            columns: ["newsletter_id"]
            isOneToOne: false
            referencedRelation: "spotlight_newsletters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "newsletter_view_log_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      prices: {
        Row: {
          active: boolean | null
          currency: string | null
          description: string | null
          id: string
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count: number | null
          metadata: Json | null
          product_id: string | null
          trial_period_days: number | null
          type: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount: number | null
        }
        Insert: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Update: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id?: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean | null
          description: string | null
          id: string
          image: string | null
          metadata: Json | null
          name: string | null
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          id: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Update: {
          active?: boolean | null
          description?: string | null
          id?: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Relationships: []
      }
      profile: {
        Row: {
          billing_address: Json | null
          disable_emails: boolean | null
          email: string | null
          full_name: string | null
          id: string
          payment_method: Json | null
        }
        Insert: {
          billing_address?: Json | null
          disable_emails?: boolean | null
          email?: string | null
          full_name?: string | null
          id: string
          payment_method?: Json | null
        }
        Update: {
          billing_address?: Json | null
          disable_emails?: boolean | null
          email?: string | null
          full_name?: string | null
          id?: string
          payment_method?: Json | null
        }
        Relationships: []
      }
      profile_domain_email_received: {
        Row: {
          domain_id: string | null
          emails_received: number | null
          id: string
          profile_id: string | null
        }
        Insert: {
          domain_id?: string | null
          emails_received?: number | null
          id?: string
          profile_id?: string | null
        }
        Update: {
          domain_id?: string | null
          emails_received?: number | null
          id?: string
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_domain_email_received_domain_id_fkey"
            columns: ["domain_id"]
            isOneToOne: false
            referencedRelation: "email_domain"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_domain_email_received_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_domain_whitelist: {
        Row: {
          blocked: boolean | null
          id: string
          profile_domain_id: string | null
        }
        Insert: {
          blocked?: boolean | null
          id?: string
          profile_domain_id?: string | null
        }
        Update: {
          blocked?: boolean | null
          id?: string
          profile_domain_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_domain_whitelist_profile_domain_id_fkey"
            columns: ["profile_domain_id"]
            isOneToOne: true
            referencedRelation: "profile_domain_email_received"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_observed_topics: {
        Row: {
          id: string
          profile_id: string
          topic_id: string
        }
        Insert: {
          id?: string
          profile_id: string
          topic_id: string
        }
        Update: {
          id?: string
          profile_id?: string
          topic_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_observed_topics_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_observed_topics_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "newsletter_topic"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_shared_knowledge_metadata: {
        Row: {
          archived: boolean | null
          bookmarked: boolean | null
          collection_id: string
          created_at: string | null
          id: string
          include_in_digest: boolean | null
          knowledge_metadata_id: string
          profile_id: string
          seen: boolean | null
          sent_in_digest: boolean | null
          updated_at: string | null
        }
        Insert: {
          archived?: boolean | null
          bookmarked?: boolean | null
          collection_id: string
          created_at?: string | null
          id?: string
          include_in_digest?: boolean | null
          knowledge_metadata_id: string
          profile_id: string
          seen?: boolean | null
          sent_in_digest?: boolean | null
          updated_at?: string | null
        }
        Update: {
          archived?: boolean | null
          bookmarked?: boolean | null
          collection_id?: string
          created_at?: string | null
          id?: string
          include_in_digest?: boolean | null
          knowledge_metadata_id?: string
          profile_id?: string
          seen?: boolean | null
          sent_in_digest?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_shared_knowledge_metadata_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "articles_view"
            referencedColumns: ["collection_id"]
          },
          {
            foreignKeyName: "profile_shared_knowledge_metadata_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collection"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_shared_knowledge_metadata_knowledge_metadata_id_fkey"
            columns: ["knowledge_metadata_id"]
            isOneToOne: false
            referencedRelation: "shared_knowledge_metadata"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_shared_knowledge_metadata_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      rss_channel: {
        Row: {
          author: string | null
          copyright: string | null
          creator: string | null
          description: string | null
          generator: string | null
          id: string
          image_link: string | null
          image_title: string | null
          image_url: string | null
          language: string | null
          last_build_date: string | null
          link: string | null
          managing_editor: string | null
          pub_date: string | null
          publisher: string | null
          rss_link: string
          skip_days: string[] | null
          skip_hours: number[] | null
          source: string | null
          title: string | null
          ttl: number | null
          web_master: string | null
          whitelisted: boolean | null
        }
        Insert: {
          author?: string | null
          copyright?: string | null
          creator?: string | null
          description?: string | null
          generator?: string | null
          id?: string
          image_link?: string | null
          image_title?: string | null
          image_url?: string | null
          language?: string | null
          last_build_date?: string | null
          link?: string | null
          managing_editor?: string | null
          pub_date?: string | null
          publisher?: string | null
          rss_link: string
          skip_days?: string[] | null
          skip_hours?: number[] | null
          source?: string | null
          title?: string | null
          ttl?: number | null
          web_master?: string | null
          whitelisted?: boolean | null
        }
        Update: {
          author?: string | null
          copyright?: string | null
          creator?: string | null
          description?: string | null
          generator?: string | null
          id?: string
          image_link?: string | null
          image_title?: string | null
          image_url?: string | null
          language?: string | null
          last_build_date?: string | null
          link?: string | null
          managing_editor?: string | null
          pub_date?: string | null
          publisher?: string | null
          rss_link?: string
          skip_days?: string[] | null
          skip_hours?: number[] | null
          source?: string | null
          title?: string | null
          ttl?: number | null
          web_master?: string | null
          whitelisted?: boolean | null
        }
        Relationships: []
      }
      rss_channel_category: {
        Row: {
          id: string
          title: string
        }
        Insert: {
          id?: string
          title: string
        }
        Update: {
          id?: string
          title?: string
        }
        Relationships: []
      }
      rss_channel_rss_channel_category: {
        Row: {
          id: string
          rss_channel_category_id: string
          rss_channel_id: string
        }
        Insert: {
          id?: string
          rss_channel_category_id: string
          rss_channel_id: string
        }
        Update: {
          id?: string
          rss_channel_category_id?: string
          rss_channel_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rss_channel_rss_channel_category_rss_channel_category_id_fkey"
            columns: ["rss_channel_category_id"]
            isOneToOne: false
            referencedRelation: "rss_channel_category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rss_channel_rss_channel_category_rss_channel_id_fkey"
            columns: ["rss_channel_id"]
            isOneToOne: false
            referencedRelation: "rss_channel"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rss_channel_rss_channel_category_rss_channel_id_fkey"
            columns: ["rss_channel_id"]
            isOneToOne: false
            referencedRelation: "user_rss_channel"
            referencedColumns: ["id"]
          },
        ]
      }
      rss_channel_subscription: {
        Row: {
          collection_id: string | null
          created_at: string | null
          id: string
          profile_id: string | null
          rss_channel_id: string | null
        }
        Insert: {
          collection_id?: string | null
          created_at?: string | null
          id?: string
          profile_id?: string | null
          rss_channel_id?: string | null
        }
        Update: {
          collection_id?: string | null
          created_at?: string | null
          id?: string
          profile_id?: string | null
          rss_channel_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_collection_id"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "articles_view"
            referencedColumns: ["collection_id"]
          },
          {
            foreignKeyName: "fk_collection_id"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collection"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rss_channel_subscription_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rss_channel_subscription_rss_channel_id_fkey"
            columns: ["rss_channel_id"]
            isOneToOne: false
            referencedRelation: "rss_channel"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rss_channel_subscription_rss_channel_id_fkey"
            columns: ["rss_channel_id"]
            isOneToOne: false
            referencedRelation: "user_rss_channel"
            referencedColumns: ["id"]
          },
        ]
      }
      rss_item: {
        Row: {
          author: string | null
          categories: string[] | null
          content: string | null
          content_snippet: string | null
          creator: string | null
          description: string | null
          enclosure_length: number | null
          enclosure_type: string | null
          enclosure_url: string | null
          guid: string | null
          id: string
          iso_date: string | null
          link: string | null
          pub_date: string | null
          rss_channel_id: string | null
          source: string | null
          title: string | null
        }
        Insert: {
          author?: string | null
          categories?: string[] | null
          content?: string | null
          content_snippet?: string | null
          creator?: string | null
          description?: string | null
          enclosure_length?: number | null
          enclosure_type?: string | null
          enclosure_url?: string | null
          guid?: string | null
          id?: string
          iso_date?: string | null
          link?: string | null
          pub_date?: string | null
          rss_channel_id?: string | null
          source?: string | null
          title?: string | null
        }
        Update: {
          author?: string | null
          categories?: string[] | null
          content?: string | null
          content_snippet?: string | null
          creator?: string | null
          description?: string | null
          enclosure_length?: number | null
          enclosure_type?: string | null
          enclosure_url?: string | null
          guid?: string | null
          id?: string
          iso_date?: string | null
          link?: string | null
          pub_date?: string | null
          rss_channel_id?: string | null
          source?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rss_item_rss_channel_id_fkey"
            columns: ["rss_channel_id"]
            isOneToOne: false
            referencedRelation: "rss_channel"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rss_item_rss_channel_id_fkey"
            columns: ["rss_channel_id"]
            isOneToOne: false
            referencedRelation: "user_rss_channel"
            referencedColumns: ["id"]
          },
        ]
      }
      rss_item_profile: {
        Row: {
          collection_id: string | null
          id: string
          knowledge_metadata_id: string | null
          profile_id: string | null
          rss_item_id: string | null
        }
        Insert: {
          collection_id?: string | null
          id?: string
          knowledge_metadata_id?: string | null
          profile_id?: string | null
          rss_item_id?: string | null
        }
        Update: {
          collection_id?: string | null
          id?: string
          knowledge_metadata_id?: string | null
          profile_id?: string | null
          rss_item_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_collection_id"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "articles_view"
            referencedColumns: ["collection_id"]
          },
          {
            foreignKeyName: "fk_collection_id"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collection"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_knowledge_metadata_id"
            columns: ["knowledge_metadata_id"]
            isOneToOne: false
            referencedRelation: "articles_view"
            referencedColumns: ["knowledge_metadata_id"]
          },
          {
            foreignKeyName: "fk_knowledge_metadata_id"
            columns: ["knowledge_metadata_id"]
            isOneToOne: false
            referencedRelation: "knowledge_metadata"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_knowledge_metadata_id"
            columns: ["knowledge_metadata_id"]
            isOneToOne: false
            referencedRelation: "received_emails"
            referencedColumns: ["knowledge_metadata_id"]
          },
          {
            foreignKeyName: "fk_knowledge_metadata_id"
            columns: ["knowledge_metadata_id"]
            isOneToOne: false
            referencedRelation: "user_rss_item"
            referencedColumns: ["knowledge_metadata_id"]
          },
          {
            foreignKeyName: "rss_item_profile_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rss_item_profile_rss_item_id_fkey"
            columns: ["rss_item_id"]
            isOneToOne: false
            referencedRelation: "rss_item"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rss_item_profile_rss_item_id_fkey"
            columns: ["rss_item_id"]
            isOneToOne: false
            referencedRelation: "user_rss_item"
            referencedColumns: ["id"]
          },
        ]
      }
      rss_item_summary: {
        Row: {
          created_at: string | null
          id: string
          key_takeaways: Json | null
          one_minute_summary: string | null
          raw_summary: Json | null
          rss_item_id: string
          short_description: string | null
          three_minute_summary: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          key_takeaways?: Json | null
          one_minute_summary?: string | null
          raw_summary?: Json | null
          rss_item_id: string
          short_description?: string | null
          three_minute_summary?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          key_takeaways?: Json | null
          one_minute_summary?: string | null
          raw_summary?: Json | null
          rss_item_id?: string
          short_description?: string | null
          three_minute_summary?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rss_item_summary_rss_item_id_fkey"
            columns: ["rss_item_id"]
            isOneToOne: false
            referencedRelation: "rss_item"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rss_item_summary_rss_item_id_fkey"
            columns: ["rss_item_id"]
            isOneToOne: false
            referencedRelation: "user_rss_item"
            referencedColumns: ["id"]
          },
        ]
      }
      rules: {
        Row: {
          _free_plan: boolean
          article_summaries_limit: number
          can_update_default_email: boolean
          can_update_digest_frequency: boolean
          can_use_nestor_agent: boolean
          collections_limit: number
          email_summaries_limit: number
          id: string
          nestorai_queries_limit: number
          product_id: string
          unlimited_article_summaries: boolean
          unlimited_collections: boolean
          unlimited_email_summaries: boolean
          unlimited_nestorai_queries: boolean
        }
        Insert: {
          _free_plan?: boolean
          article_summaries_limit: number
          can_update_default_email?: boolean
          can_update_digest_frequency?: boolean
          can_use_nestor_agent?: boolean
          collections_limit: number
          email_summaries_limit: number
          id?: string
          nestorai_queries_limit: number
          product_id: string
          unlimited_article_summaries?: boolean
          unlimited_collections?: boolean
          unlimited_email_summaries?: boolean
          unlimited_nestorai_queries?: boolean
        }
        Update: {
          _free_plan?: boolean
          article_summaries_limit?: number
          can_update_default_email?: boolean
          can_update_digest_frequency?: boolean
          can_use_nestor_agent?: boolean
          collections_limit?: number
          email_summaries_limit?: number
          id?: string
          nestorai_queries_limit?: number
          product_id?: string
          unlimited_article_summaries?: boolean
          unlimited_collections?: boolean
          unlimited_email_summaries?: boolean
          unlimited_nestorai_queries?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "rules_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      shared_documents: {
        Row: {
          content: string | null
          embedding: string | null
          id: string
          knowledge_metadata_id: string
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: string
          knowledge_metadata_id: string
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: string
          knowledge_metadata_id?: string
          metadata?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "shared_documents_knowledge_metadata_id_fkey"
            columns: ["knowledge_metadata_id"]
            isOneToOne: false
            referencedRelation: "shared_knowledge_metadata"
            referencedColumns: ["id"]
          },
        ]
      }
      shared_knowledge_metadata: {
        Row: {
          created_at: string | null
          id: string
          object_id: string
          object_table: string
          stored_in_documents: boolean | null
          summarized: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          object_id: string
          object_table: string
          stored_in_documents?: boolean | null
          summarized?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          object_id?: string
          object_table?: string
          stored_in_documents?: boolean | null
          summarized?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at: string | null
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created: string
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          id: string
          metadata: Json | null
          price_id: string | null
          quantity: number | null
          status: Database["public"]["Enums"]["subscription_status"] | null
          trial_end: string | null
          trial_start: string | null
          user_id: string
        }
        Insert: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id: string
        }
        Update: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_price_id_fkey"
            columns: ["price_id"]
            isOneToOne: false
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      used_invitations: {
        Row: {
          created_at: string | null
          id: string
          invited_profile_id: string
        }
        Insert: {
          created_at?: string | null
          id: string
          invited_profile_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          invited_profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "used_invitations_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "invitation_codes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "used_invitations_invited_profile_id_fkey"
            columns: ["invited_profile_id"]
            isOneToOne: true
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      articles_view: {
        Row: {
          archived: boolean | null
          bookmarked: boolean | null
          collection: string | null
          collection_id: string | null
          created_at: string | null
          id: string | null
          include_in_digest: boolean | null
          knowledge_metadata_id: string | null
          metadata_tags: string[] | null
          name: string | null
          seen: boolean | null
          sent_in_digest: boolean | null
          stored_in_documents: boolean | null
          summarized: boolean | null
        }
        Relationships: []
      }
      articles_with_summaries: {
        Row: {
          article_summary_id: string | null
          article_url: string | null
          collection_id: string | null
          created_at: string | null
          id: string | null
          key_takeaways: Json | null
          name: string | null
          one_minute_summary: string | null
          short_description: string | null
          summarized_at: string | null
          three_minute_summary: string | null
        }
        Relationships: [
          {
            foreignKeyName: "article_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "articles_view"
            referencedColumns: ["collection_id"]
          },
          {
            foreignKeyName: "article_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collection"
            referencedColumns: ["id"]
          },
        ]
      }
      domain_whitelist: {
        Row: {
          blocked: boolean | null
          domain: string | null
          emails_received: number | null
          id: string | null
        }
        Relationships: []
      }
      last_day_trending_newsletters: {
        Row: {
          id: string | null
          view_count: number | null
        }
        Relationships: []
      }
      last_week_trending_newsletters: {
        Row: {
          id: string | null
          view_count: number | null
        }
        Relationships: []
      }
      received_emails: {
        Row: {
          archived: boolean | null
          bookmarked: boolean | null
          collection_id: string | null
          email_from: string | null
          email_from_name: string | null
          email_received_at: string | null
          email_summary_id: string | null
          email_to: string | null
          html_email: string | null
          include_in_digest: boolean | null
          incoming_email_id: string | null
          key_takeaways: Json | null
          knowledge_metadata_id: string | null
          metadata_tags: string[] | null
          one_minute_summary: string | null
          seen: boolean | null
          sent_in_digest: boolean | null
          short_description: string | null
          stored_in_documents: boolean | null
          subject: string | null
          summarized: boolean | null
          summarized_at: string | null
          three_minute_summary: string | null
        }
        Relationships: [
          {
            foreignKeyName: "incoming_emails_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "articles_view"
            referencedColumns: ["collection_id"]
          },
          {
            foreignKeyName: "incoming_emails_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collection"
            referencedColumns: ["id"]
          },
        ]
      }
      similar_newsletters: {
        Row: {
          newsletter_id: string | null
          rank: number | null
          similar_newsletter_id: string | null
        }
        Relationships: []
      }
      spotlight_newsletters: {
        Row: {
          archive_url: string | null
          created_at: string | null
          description: string | null
          id: string | null
          language_id: string | null
          name: string | null
          newsletter_image_url: string | null
          newsletter_url: string | null
          rate_id: string | null
          sample_url: string | null
          slug: string | null
          tagline: string | null
          topic_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "newsletter_language_id_fkey"
            columns: ["language_id"]
            isOneToOne: false
            referencedRelation: "newsletter_language"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "newsletter_rate_id_fkey"
            columns: ["rate_id"]
            isOneToOne: false
            referencedRelation: "newsletter_rate"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "newsletter_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "newsletter_topic"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_period_usage: {
        Row: {
          article_summary: number | null
          collections: number | null
          conversation_messages: number | null
          email_summaries: number | null
        }
        Relationships: []
      }
      user_rss_channel: {
        Row: {
          author: string | null
          channel_subscription_id: string | null
          collection_id: string | null
          copyright: string | null
          creator: string | null
          description: string | null
          generator: string | null
          id: string | null
          image_link: string | null
          image_title: string | null
          image_url: string | null
          language: string | null
          last_build_date: string | null
          link: string | null
          managing_editor: string | null
          profile_id: string | null
          pub_date: string | null
          publisher: string | null
          rss_link: string | null
          skip_days: string[] | null
          skip_hours: number[] | null
          source: string | null
          subscribed_at: string | null
          title: string | null
          ttl: number | null
          web_master: string | null
          whitelisted: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_collection_id"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "articles_view"
            referencedColumns: ["collection_id"]
          },
          {
            foreignKeyName: "fk_collection_id"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collection"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rss_channel_subscription_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      user_rss_item: {
        Row: {
          archived: boolean | null
          author: string | null
          bookmarked: boolean | null
          categories: string[] | null
          collection_id: string | null
          content: string | null
          content_snippet: string | null
          creator: string | null
          description: string | null
          enclosure_length: number | null
          enclosure_type: string | null
          enclosure_url: string | null
          guid: string | null
          id: string | null
          include_in_digest: boolean | null
          iso_date: string | null
          knowledge_metadata_id: string | null
          link: string | null
          metadata_tags: string[] | null
          profile_id: string | null
          profile_item_id: string | null
          pub_date: string | null
          rss_channel_id: string | null
          seen: boolean | null
          sent_in_digest: boolean | null
          source: string | null
          stored_in_documents: boolean | null
          summarized: boolean | null
          title: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_collection_id"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "articles_view"
            referencedColumns: ["collection_id"]
          },
          {
            foreignKeyName: "fk_collection_id"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collection"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rss_item_profile_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rss_item_rss_channel_id_fkey"
            columns: ["rss_channel_id"]
            isOneToOne: false
            referencedRelation: "rss_channel"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rss_item_rss_channel_id_fkey"
            columns: ["rss_channel_id"]
            isOneToOne: false
            referencedRelation: "user_rss_channel"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      find_similar_newsletters: {
        Args: { query_embedding: string }
        Returns: {
          description: string
          id: string
          language: string
          name: string
          newsletter_image_url: string
          rate: string
          similarity: number
          slug: string
          tagline: string
          topic: string
        }[]
      }
      generate_email: {
        Args: { email: string }
        Returns: string
      }
      get_subscription_period: {
        Args: { u_id: string }
        Returns: {
          period_end: string
          period_start: string
        }[]
      }
      get_user_rules: {
        Args: { user_uuid: string }
        Returns: {
          _free_plan: boolean
          article_summaries_limit: number
          can_update_default_email: boolean
          can_update_digest_frequency: boolean
          can_use_nestor_agent: boolean
          collections_limit: number
          email_summaries_limit: number
          id: string
          nestorai_queries_limit: number
          product_id: string
          unlimited_article_summaries: boolean
          unlimited_collections: boolean
          unlimited_email_summaries: boolean
          unlimited_nestorai_queries: boolean
        }
      }
      kw_match_documents: {
        Args: {
          filter?: Json
          language?: unknown
          match_count: number
          query_text: string
        }
        Returns: {
          content: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
      match_documents: {
        Args: { filter?: Json; match_count?: number; query_embedding: string }
        Returns: {
          content: string
          id: number
          metadata: Json
          similarity: number
        }[]
      }
    }
    Enums: {
      digest_summary_type: "key-takeaways" | "one-minute" | "three-minute"
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      schedule_type: "daily" | "weekly" | "none"
      speaker: "user" | "ai"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
        | "paused"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      digest_summary_type: ["key-takeaways", "one-minute", "three-minute"],
      pricing_plan_interval: ["day", "week", "month", "year"],
      pricing_type: ["one_time", "recurring"],
      schedule_type: ["daily", "weekly", "none"],
      speaker: ["user", "ai"],
      subscription_status: [
        "trialing",
        "active",
        "canceled",
        "incomplete",
        "incomplete_expired",
        "past_due",
        "unpaid",
        "paused",
      ],
    },
  },
} as const
