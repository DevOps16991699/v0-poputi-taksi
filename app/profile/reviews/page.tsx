"use client"

import { useState } from "react"
import { MobileLayout } from "@/components/mobile-layout"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Star,
  User,
  ThumbsUp,
  MessageCircle,
  Filter
} from "lucide-react"
import Link from "next/link"
import { useRole } from "@/contexts/role-context"

interface Review {
  id: string
  authorName: string
  authorRole: "driver" | "passenger"
  rating: number
  comment: string
  date: string
  route: string
  helpful: number
}

const driverReviews: Review[] = [
  {
    id: "1",
    authorName: "Aziza Rahimova",
    authorRole: "passenger",
    rating: 5,
    comment: "Juda yaxshi haydovchi! Vaqtida keldi, mashina toza va qulay edi. Tavsiya qilaman!",
    date: "2024-01-15",
    route: "Toshkent → Samarqand",
    helpful: 12
  },
  {
    id: "2",
    authorName: "Bobur Aliyev",
    authorRole: "passenger",
    rating: 4,
    comment: "Yaxshi safar bo'ldi. Faqat biroz kech qoldi, lekin umuman qoniqarli.",
    date: "2024-01-10",
    route: "Toshkent → Buxoro",
    helpful: 5
  },
  {
    id: "3",
    authorName: "Nilufar Karimova",
    authorRole: "passenger",
    rating: 5,
    comment: "Ajoyib tajriba! Xavfsiz va qulay safar. Rahmat!",
    date: "2024-01-05",
    route: "Toshkent → Namangan",
    helpful: 8
  }
]

const passengerReviews: Review[] = [
  {
    id: "1",
    authorName: "Alisher Navoi",
    authorRole: "driver",
    rating: 5,
    comment: "Juda madaniyatli yo'lovchi. Vaqtida keldi va safar davomida yoqimli suhbat qildik.",
    date: "2024-01-14",
    route: "Toshkent → Andijon",
    helpful: 7
  },
  {
    id: "2",
    authorName: "Sardor Rahmonov",
    authorRole: "driver",
    rating: 5,
    comment: "Ajoyib yo'lovchi! Tavsiya qilaman.",
    date: "2024-01-08",
    route: "Toshkent → Farg'ona",
    helpful: 4
  }
]

const filterOptions = [
  { id: "all", label: "Barchasi" },
  { id: "5", label: "5 yulduz" },
  { id: "4", label: "4 yulduz" },
  { id: "3", label: "3 yulduz va kam" }
]

export default function ReviewsPage() {
  const { role } = useRole()
  const [filter, setFilter] = useState("all")
  
  const reviews = role === "driver" ? driverReviews : passengerReviews
  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
  const totalReviews = reviews.length

  const filteredReviews = reviews.filter(review => {
    if (filter === "all") return true
    if (filter === "3") return review.rating <= 3
    return review.rating === parseInt(filter)
  })

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100
  }))

  return (
    <MobileLayout showSidebarToggle={false}>
      <div className="flex flex-col min-h-full bg-background">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/profile">
              <Button variant="ghost" size="icon" className="rounded-xl">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-bold text-foreground">Reyting va sharhlar</h1>
          </div>
        </div>

        {/* Rating Summary */}
        <div className="px-4 py-6 bg-gradient-to-br from-amber-500/10 to-background">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-foreground">{averageRating.toFixed(1)}</div>
              <div className="flex items-center justify-center gap-0.5 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(averageRating)
                        ? "text-amber-500 fill-amber-500"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{totalReviews} ta sharh</p>
            </div>
            
            {/* Distribution */}
            <div className="flex-1 space-y-1.5">
              {ratingDistribution.map((item) => (
                <div key={item.rating} className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-3">{item.rating}</span>
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-6">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setFilter(option.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  filter === option.id
                    ? "bg-amber-500 text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="flex-1 px-4 py-4 space-y-4">
          {filteredReviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                <MessageCircle className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Sharh yo'q</h3>
              <p className="text-sm text-muted-foreground">
                Bu filtirda sharhlar topilmadi
              </p>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div
                key={review.id}
                className="bg-background rounded-2xl p-4 shadow-lg border border-border/50"
              >
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground text-sm">{review.authorName}</h4>
                    <p className="text-xs text-muted-foreground">
                      {review.authorRole === "driver" ? "Haydovchi" : "Yo'lovchi"}
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? "text-amber-500 fill-amber-500"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Route */}
                <div className="mt-3 px-3 py-1.5 bg-muted rounded-lg inline-block">
                  <p className="text-xs text-muted-foreground">{review.route}</p>
                </div>

                {/* Comment */}
                <p className="mt-3 text-sm text-foreground leading-relaxed">
                  {review.comment}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground">
                    {new Date(review.date).toLocaleDateString("uz-UZ", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </span>
                  <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Foydali ({review.helpful})</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </MobileLayout>
  )
}
